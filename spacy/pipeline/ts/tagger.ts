// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Tagger implements PipelineComponent {
  constructor(public name: string = 'tagger') {}
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

export function createTagger(config: Config = {}): Tagger {
  return new Tagger('tagger');
}
