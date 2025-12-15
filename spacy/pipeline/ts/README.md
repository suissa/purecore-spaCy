# TypeScript placeholders for `spacy/pipeline`

This directory contains lightweight TypeScript mirrors for every module under `spacy/pipeline`.
The goal is to provide a typed surface that mirrors the original Python/Cython pipeline
components without attempting to replicate their runtime behavior.

## Usage

1. Install dependencies in this folder:
   ```bash
   npm install
   ```
2. Build the declarations and JavaScript output:
   ```bash
   npm run build
   ```

The generated files in `dist/` can be imported by tooling that expects TypeScript-compatible
stubs of the spaCy pipeline components.
