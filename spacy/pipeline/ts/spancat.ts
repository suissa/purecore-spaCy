// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Spancat implements PipelineComponent {
  constructor(public name: string = 'spancat') {}
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

export function createSpancat(config: Config = {}): Spancat {
  return new Spancat('spancat');
}
