// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Morphologizer implements PipelineComponent {
  constructor(public name: string = 'morphologizer') {}
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

export function createMorphologizer(config: Config = {}): Morphologizer {
  return new Morphologizer('morphologizer');
}
