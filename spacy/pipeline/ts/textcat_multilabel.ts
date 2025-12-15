// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class TextcatMultilabel implements PipelineComponent {
  constructor(public name: string = 'textcat_multilabel') {}
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

export function createTextcatMultilabel(config: Config = {}): TextcatMultilabel {
  return new TextcatMultilabel('textcat_multilabel');
}
