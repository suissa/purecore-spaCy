import { spawn } from "child_process";
import path from "path";

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
  /**
   * Path to the helper Python script. Defaults to the bundled bridge.
   */
  bridgeScript?: string;
}

export class SpacyBridge {
  private readonly pythonPath: string;
  private readonly model: string;
  private readonly bridgeScript: string;

  constructor(options: SpacyBridgeOptions = {}) {
    this.pythonPath = options.pythonPath ?? "python";
    this.model = options.model ?? "pt_core_news_sm";
    this.bridgeScript =
      options.bridgeScript ??
      path.join(__dirname, "../python/spacy_bridge.py");
  }

  async analyze(text: string, modelOverride?: string): Promise<SpacyResponse> {
    const payload = { text };
    const model = modelOverride ?? this.model;
    const args = [this.bridgeScript, "--model", model];
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

      proc.stdout.on("data", (chunk) => {
        stdout += chunk.toString("utf8");
      });

      proc.stderr.on("data", (chunk) => {
        stderr += chunk.toString("utf8");
      });

      proc.on("error", (err) => reject(err));

      proc.on("close", (code) => {
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
