// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class SpanFinder implements PipelineComponent {
  constructor(public name: string = 'span_finder') {}
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

export function createSpanFinder(config: Config = {}): SpanFinder {
  return new SpanFinder('span_finder');
}
