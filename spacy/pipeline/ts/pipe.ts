// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Pipe implements PipelineComponent {
  constructor(public name: string = 'pipe') {}
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

export function createPipe(config: Config = {}): Pipe {
  return new Pipe('pipe');
}
