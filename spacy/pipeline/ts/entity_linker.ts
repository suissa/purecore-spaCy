// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class EntityLinker implements PipelineComponent {
  constructor(public name: string = 'entity_linker') {}
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

export function createEntityLinker(config: Config = {}): EntityLinker {
  return new EntityLinker('entity_linker');
}
