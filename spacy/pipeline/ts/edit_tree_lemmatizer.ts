// Auto-generated TypeScript placeholders for spaCy pipeline components
import { Doc, PipelineComponent, Serialized, Config } from './types';

export class EditTreeLemmatizer implements PipelineComponent {
  constructor(public name: string = 'edit_tree_lemmatizer') {}
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

export function createEditTreeLemmatizer(config: Config = {}): EditTreeLemmatizer {
  return new EditTreeLemmatizer('edit_tree_lemmatizer');
}
