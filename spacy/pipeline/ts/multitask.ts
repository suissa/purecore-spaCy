// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Multitask implements PipelineComponent {
  constructor(public name: string = 'multitask') {}
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

export function createMultitask(config: Config = {}): Multitask {
  return new Multitask('multitask');
}
