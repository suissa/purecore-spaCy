// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class TransitionParser implements PipelineComponent {
  constructor(public name: string = 'transition_parser') {}
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

export function createTransitionParser(config: Config = {}): TransitionParser {
  return new TransitionParser('transition_parser');
}
