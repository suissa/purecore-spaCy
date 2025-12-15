// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Functions implements PipelineComponent {
  constructor(public name: string = 'functions') {}
  process(doc: Doc): Doc {
    return doc;
  }
  describe(): Serialized {
    return { component: this.name };
  }
  configure(config: Config = {}): this {
    return this;
  }
}

export function createFunctions(config: Config = {}): Functions {
  return new Functions('functions');
}
