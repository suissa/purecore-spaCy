// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Lemmatizer implements PipelineComponent {
  constructor(public name: string = 'lemmatizer') {}
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

export function createLemmatizer(config: Config = {}): Lemmatizer {
  return new Lemmatizer('lemmatizer');
}
