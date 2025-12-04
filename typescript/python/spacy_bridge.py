import argparse
import json
import sys
from typing import Any, Dict, List

import spacy


def serialize_doc(doc: "spacy.tokens.Doc", model: str) -> Dict[str, Any]:
    return {
        "model": model,
        "text": doc.text,
        "tokens": [
            {
                "text": token.text,
                "lemma": token.lemma_,
                "pos": token.pos_,
                "tag": token.tag_,
                "dep": token.dep_,
                "entType": token.ent_type_,
            }
            for token in doc
        ],
        "entities": [
            {
                "text": ent.text,
                "label": ent.label_,
                "start": ent.start_char,
                "end": ent.end_char,
            }
            for ent in doc.ents
        ],
        "sentences": [sent.text for sent in doc.sents],
    }


def main(argv: List[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        description="Tiny JSON bridge for spaCy models invoked from TypeScript",
    )
    parser.add_argument(
        "--model",
        default="pt_core_news_sm",
        help=(
            "spaCy pipeline to load. Must be installed beforehand, e.g. via "
            "'python -m spacy download pt_core_news_sm'."
        ),
    )

    args = parser.parse_args(argv)
    payload = json.load(sys.stdin)
    text = payload.get("text", "")
    nlp = spacy.load(args.model)
    doc = nlp(text)
    json.dump(serialize_doc(doc, args.model), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
