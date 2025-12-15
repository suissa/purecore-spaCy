// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Textcat implements PipelineComponent {
  constructor(public name: string = 'textcat') {}
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

export function createTextcat(config: Config = {}): Textcat {
  return new Textcat('textcat');
}
