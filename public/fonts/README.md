# Aura UI Font Collection

Copyright © 2026 Code2WithPratik. All rights reserved for the Aura UI collection metadata, previews, registry tooling, documentation, and original assets authored by Code2WithPratik.

## About

This directory contains font assets used by the Aura UI font gallery. The collection is discovered automatically by `scripts/generate-font-registry.mjs` and exposed through the Aura UI font registry, previews, CSS endpoints, and download tooling.

## Using a font in Aura UI

Run:

```bash
npm run fonts:prepare
```

Then use the generated CSS endpoint:

```html
<link rel="stylesheet" href="https://aura-ui-os.vercel.app/fonts/arima.css" />
```

Individual WOFF2 files are available from their generated registry URLs.

## Adding a font

1. Create a family folder inside `public/fonts/`.
2. Add the WOFF2 files and any applicable upstream license or attribution files.
3. Run `npm run fonts:prepare`.
4. Review the generated registry before deploying.

The generator detects family names, weights, italic styles, and variable fonts from filenames. When metadata is ambiguous, review the generated result manually.

## Licensing and redistribution

The Aura UI collection license in [`LICENSE`](./LICENSE) applies to Aura UI-authored documentation, metadata, registry tooling, and original assets only.

Font files may be copyrighted by their original type designers or distributors. Their upstream license controls whether they may be embedded, modified, bundled, or redistributed. Do not assume that a font file can be redistributed merely because it is present in this repository.

The build keeps family ZIP downloads disabled unless redistribution permission is explicitly confirmed for that family. Add the applicable license and attribution information to the family folder, then update the registry metadata only after verifying those rights.

## Attribution

Aura UI is developed by **Code2WithPratik**.

