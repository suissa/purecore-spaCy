// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Sentencizer implements PipelineComponent {
  constructor(public name: string = 'sentencizer') {}
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

export function createSentencizer(config: Config = {}): Sentencizer {
  return new Sentencizer('sentencizer');
}
