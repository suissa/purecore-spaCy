import console from "node:console";

export const DEFAULT_KEYS = ["requires", "assigns", "scores", "retokenizes"] as const;

type DefaultKey = (typeof DEFAULT_KEYS)[number];

export interface PipeMeta {
  assigns: string[];
  requires: string[];
  scores?: Record<string, unknown> | string[];
  retokenizes?: boolean;
  [key: string]: unknown;
}

export interface LanguageLike {
  pipe_names: string[];
  pipeline: Array<[string, unknown]>;
  get_pipe_meta(name: string): PipeMeta;
}

export interface AttrInfo {
  assigns: string[];
  requires: string[];
}

export interface PipeAnalysisResult {
  summary: Record<string, Record<string, unknown>>;
  problems: Record<string, string[]>;
  attrs: Record<string, AttrInfo>;
}

function dotToDict(source: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    const parts = key.split(".");
    let cursor: Record<string, unknown> = result;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        cursor[part] = value;
        return;
      }
      if (typeof cursor[part] !== "object" || cursor[part] === null) {
        cursor[part] = {};
      }
      cursor = cursor[part] as Record<string, unknown>;
    });
  }
  return result;
}

export function validateAttrs(values: Iterable<string>): string[] {
  const valuesList = Array.from(values);
  const data = dotToDict(Object.fromEntries(valuesList.map((value) => [value, true])));
  const allowedObjects = new Set(["doc", "token", "span"]);

  for (const [objKey, attrs] of Object.entries(data)) {
    if (objKey === "span") {
      const invalidSpanAttrs = valuesList
        .filter((attr) => attr.startsWith("span."))
        .filter((attr) => !attr.startsWith("span._."));
      if (invalidSpanAttrs.length) {
        throw new Error(
          `Span attributes must use custom extensions (span._.*). Invalid: ${invalidSpanAttrs.join(", ")}`
        );
      }
    }

    if (!allowedObjects.has(objKey)) {
      const invalid = valuesList.filter((attr) => attr.startsWith(`${objKey}.`)).join(", ");
      throw new Error(`Invalid attribute object '${objKey}' for: ${invalid}`);
    }

    if (typeof attrs !== "object" || attrs === null) {
      throw new Error(`Attribute '${objKey}' must include a field name.`);
    }

    for (const [attr, value] of Object.entries(attrs)) {
      if (attr === "_") {
        if (value === true) {
          throw new Error(`Custom extensions on ${objKey} must use span._.name syntax.`);
        }
        if (typeof value === "object" && value !== null) {
          for (const [extAttr, extValue] of Object.entries(value)) {
            if (extValue !== true) {
              const suggestion = `${objKey}._.${extAttr}`;
              const invalidPath = `${suggestion}.${Object.keys(extValue as Record<string, unknown>).join(".")}`;
              throw new Error(`Invalid extension path '${invalidPath}'. Try '${suggestion}'.`);
            }
          }
        }
        continue;
      }

      if (attr.endsWith("_")) {
        throw new Error(`Attribute '${attr}' should omit the trailing underscore.`);
      }

      if (value !== true) {
        const suggestion = `${objKey}.${attr}`;
        const invalidPath = `${suggestion}.${Object.keys(value as Record<string, unknown>).join(".")}`;
        throw new Error(`Invalid attribute path '${invalidPath}'. Try '${suggestion}'.`);
      }
    }
  }

  return valuesList;
}

export function getAttrInfo(nlp: LanguageLike, attr: string): AttrInfo {
  const result: AttrInfo = { assigns: [], requires: [] };
  for (const pipeName of nlp.pipe_names) {
    const meta = nlp.get_pipe_meta(pipeName);
    if (meta.assigns.includes(attr)) {
      result.assigns.push(pipeName);
    }
    if (meta.requires.includes(attr)) {
      result.requires.push(pipeName);
    }
  }
  return result;
}

export function analyzePipes(
  nlp: LanguageLike,
  keys: DefaultKey[] = [...DEFAULT_KEYS]
): PipeAnalysisResult {
  const result: PipeAnalysisResult = { summary: {}, problems: {}, attrs: {} };
  const allAttrs = new Set<string>();

  nlp.pipe_names.forEach((name, i) => {
    const meta = nlp.get_pipe_meta(name);
    meta.assigns.forEach((attr) => allAttrs.add(attr));
    meta.requires.forEach((attr) => allAttrs.add(attr));

    result.summary[name] = Object.fromEntries(keys.map((key) => [key, (meta as Record<string, unknown>)[key]]));

    const requires: Record<string, boolean> = Object.fromEntries(meta.requires.map((attr) => [attr, false]));
    if (meta.requires.length) {
      for (const [prevName] of nlp.pipeline.slice(0, i)) {
        const prevMeta = nlp.get_pipe_meta(prevName);
        prevMeta.assigns.forEach((annot) => {
          requires[annot] = true;
        });
      }
    }
    result.problems[name] = Object.entries(requires)
      .filter(([, fulfilled]) => !fulfilled)
      .map(([annot]) => annot);
  });

  allAttrs.forEach((attr) => {
    result.attrs[attr] = getAttrInfo(nlp, attr);
  });

  return result;
}

export function printPipeAnalysis(analysis: PipeAnalysisResult, keys: DefaultKey[] = [...DEFAULT_KEYS]): void {
  divider("Pipeline Overview");
  const header = ["#", "Component", ...keys.map((key) => key.toUpperCase())];
  const summaryEntries = Object.entries(analysis.summary);
  const rows = summaryEntries.map(([name, meta], index) => [index, name, ...keys.map((key) => meta[key])]);
  table(rows, header);

  const nProblems = Object.values(analysis.problems).reduce((acc, cur) => acc + cur.length, 0);
  if (nProblems) {
    divider(`Problems (${nProblems})`);
    for (const [name, problems] of Object.entries(analysis.problems)) {
      if (problems.length) {
        warn(`'${name}' requirements not met: ${problems.join(", ")}`);
      }
    }
  } else {
    good("No problems found.");
  }
}

function divider(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function table(rows: unknown[][], header: string[]): void {
  console.log(header.join(" | "));
  console.log(header.map(() => "---").join(" | "));
  rows.forEach((row) => {
    console.log(row.map((cell) => formatCell(cell)).join(" | "));
  });
}

function warn(text: string): void {
  console.warn(text);
}

function good(text: string): void {
  console.log(text);
}

function formatCell(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  return String(value ?? "");
}
