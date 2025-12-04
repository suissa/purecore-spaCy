# TypeScript bridge for spaCy (Portuguese models)

This folder shows how to call existing **spaCy** pipelines (including the
[Portuguese models](https://spacy.io/models/pt)) from a small TypeScript
wrapper. The Node.js code invokes a helper Python script that loads the model
and returns a JSON payload with tokens, sentences, and entities.

## Pré-requisitos

- Python com `spaCy` instalado (`pip install spacy`).
- O modelo desejado já baixado, por exemplo:

  ```bash
  python -m spacy download pt_core_news_sm
  ```

- Node.js 18+.

## Instalação e uso

```bash
cd typescript
npm install
npm run build
node dist/index.js
```

O script de exemplo usa o modelo `pt_core_news_sm` por padrão. Para alterar o
modelo, modifique a opção `model` ao instanciar `SpacyBridge` ou passe o nome
na chamada `analyze`.

```ts
import { SpacyBridge } from "./dist/index.js";

const bridge = new SpacyBridge({ model: "pt_core_news_md" });
bridge.analyze("A linguagem portuguesa é rica e complexa.").then(console.log);
```
