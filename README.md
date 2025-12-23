# KQL ⇄ JSON Converter (static)

Simple static web UI to convert between KQL and a JSON object with a `query` field. Designed to be GitHub Pages–compatible.

Usage

- Open `webapp/index.html` in a browser (or publish the `webapp/` folder to GitHub Pages).
- Paste KQL into the top editor and click "Convert → JSON (down)" to generate JSON in the bottom pane.
- Paste JSON containing a `query` string into the bottom editor and click "Convert → KQL (up)" to extract the KQL into the top pane.

Notes

- Conversion is simple: JSON → KQL extracts `.query`. KQL → JSON wraps the KQL text into `{ "query": "..." }` and pretty-prints it.
- This static app avoids servers and is safe to host on GitHub Pages. For heavier or more advanced conversions (semantic transforms), consider a WASM or server-side implementation.
