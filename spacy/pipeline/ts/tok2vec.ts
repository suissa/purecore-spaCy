// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Tok2vec implements PipelineComponent {
  constructor(public name: string = 'tok2vec') {}
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

export function createTok2vec(config: Config = {}): Tok2vec {
  return new Tok2vec('tok2vec');
}
