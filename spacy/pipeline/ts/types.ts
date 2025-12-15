// Shared interfaces for the TypeScript representations of spaCy pipeline components
export interface Doc {
  text: string;
  userData?: Record<string, unknown>;
}

export interface Span {
  text: string;
  start: number;
  end: number;
  label?: string;
}

export interface Token {
  text: string;
  idx: number;
  lemma?: string;
  pos?: string;
}

export interface Serialized {
  [key: string]: unknown;
}

export interface Config {
  [key: string]: unknown;
}

export interface PipelineComponent {
  name: string;
  process(doc: Doc): Doc;
  describe(): Serialized;
  configure?(config: Config): this;
}
