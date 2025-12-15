// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class SpanRuler implements PipelineComponent {
  constructor(public name: string = 'span_ruler') {}
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

export function createSpanRuler(config: Config = {}): SpanRuler {
  return new SpanRuler('span_ruler');
}
