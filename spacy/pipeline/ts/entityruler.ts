// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Entityruler implements PipelineComponent {
  constructor(public name: string = 'entityruler') {}
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

export function createEntityruler(config: Config = {}): Entityruler {
  return new Entityruler('entityruler');
}
