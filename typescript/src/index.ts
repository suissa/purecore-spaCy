import { spawn } from "child_process";

export interface TokenView {
  text: string;
  lemma: string;
  pos: string;
  tag: string;
  dep: string;
  entType: string;
}

export interface EntityView {
  text: string;
  label: string;
  start: number;
  end: number;
}

export interface SpacyResponse {
  model: string;
  text: string;
  tokens: TokenView[];
  entities: EntityView[];
  sentences: string[];
}

export interface SpacyBridgeOptions {
  /**
   * Path to the Python executable that has spaCy installed.
   */
  pythonPath?: string;
  /**
   * Default spaCy model to load (Portuguese small model by default).
   */
  model?: string;
}

export class SpacyBridge {
  private readonly pythonPath: string;
  private readonly model: string;

  constructor(options: SpacyBridgeOptions = {}) {
    this.pythonPath = options.pythonPath ?? "python";
    this.model = options.model ?? "pt_core_news_sm";
  }

  async analyze(text: string, modelOverride?: string): Promise<SpacyResponse> {
    const payload = { text };
    const model = modelOverride ?? this.model;
    const args = ["-c", buildPythonScript(), "--model", model];
    const jsonOutput = await this.runPython(args, JSON.stringify(payload));
    return JSON.parse(jsonOutput) as SpacyResponse;
  }

  private runPython(args: string[], input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc = spawn(this.pythonPath, args, {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";

      proc.stdout.on("data", (chunk: Buffer) => {
        stdout += chunk.toString("utf8");
      });

      proc.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString("utf8");
      });

      proc.on("error", (err: Error) => reject(err));

      proc.on("close", (code: number | null) => {
        if (code !== 0) {
          reject(new Error(`Python exited with code ${code}: ${stderr}`));
        } else {
          resolve(stdout.trim());
        }
      });

      proc.stdin.write(input);
      proc.stdin.end();
    });
  }
}

function buildPythonScript(): string {
  return `import argparse, json, sys

parser = argparse.ArgumentParser(description="spaCy bridge")
parser.add_argument("--model", default="pt_core_news_sm")
args = parser.parse_args()

try:
    import spacy
except ImportError as exc:
    sys.stderr.write("spaCy não está instalado: %s\n" % exc)
    sys.exit(1)

try:
    nlp = spacy.load(args.model)
except Exception as exc:  # pragma: no cover - runtime guard
    sys.stderr.write("Falha ao carregar o modelo %s: %s\n" % (args.model, exc))
    sys.exit(1)

payload = json.load(sys.stdin)
doc = nlp(payload.get("text", ""))

def token_view(tok):
    return {
        "text": tok.text,
        "lemma": tok.lemma_,
        "pos": tok.pos_,
        "tag": tok.tag_,
        "dep": tok.dep_,
        "entType": tok.ent_type_,
    }

def ent_view(ent):
    return {
        "text": ent.text,
        "label": ent.label_,
        "start": ent.start_char,
        "end": ent.end_char,
    }

response = {
    "model": args.model,
    "text": doc.text,
    "tokens": [token_view(tok) for tok in doc],
    "entities": [ent_view(ent) for ent in doc.ents],
    "sentences": [sent.text for sent in doc.sents],
}

json.dump(response, sys.stdout, ensure_ascii=False)`;
}

if (require.main === module) {
  const bridge = new SpacyBridge();
  const sampleText =
    "A spaCy possui modelos prontos para português, como o pt_core_news_sm.";

  bridge
    .analyze(sampleText)
    .then((result) => {
      console.log("Modelo carregado:", result.model);
      console.log("Tokens:");
      for (const token of result.tokens) {
        console.log(
          `  ${token.text}\t${token.lemma}\t${token.pos}\t${token.entType}`,
        );
      }
      if (result.entities.length) {
        console.log("Entidades nomeadas:");
        for (const ent of result.entities) {
          console.log(
            `  ${ent.text} [${ent.label}] (${ent.start}-${ent.end})`,
          );
        }
      }
    })
    .catch((err) => {
      console.error("Falha ao executar spaCy via Python:", err);
      process.exitCode = 1;
    });
}
