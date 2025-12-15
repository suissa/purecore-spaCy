// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class Attributeruler implements PipelineComponent {
  constructor(public name: string = 'attributeruler') {}
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

export function createAttributeruler(config: Config = {}): Attributeruler {
  return new Attributeruler('attributeruler');
}
