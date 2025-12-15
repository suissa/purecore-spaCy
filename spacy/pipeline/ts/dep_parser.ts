// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class DepParser implements PipelineComponent {
  constructor(public name: string = 'dep_parser') {}
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

export function createDepParser(config: Config = {}): DepParser {
  return new DepParser('dep_parser');
}
