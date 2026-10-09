# Shrinika Fragrances

A responsive, cinematic fragrance brand concept. Buildless HTML, CSS and JavaScript with a locally served Three.js 0.170.0 bottle scene.

## Run

```sh
python3 download-assets.py
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No npm installation or build step is required. Deploy the `dist` directory to any static host.

## Experience

- Pointer-responsive WebGL bottle, procedural studio lighting and CSS fallback.
- Scroll reveals, landscape parallax, hover motion and reduced-motion support.
- Keyboard-accessible scent layers, fragrance details and a two-step scent finder.
- Responsive mobile layouts and native modal dialogs.

## Content and assets

Brand name supplied by the owner. Product names, notes and bottle designs are illustrative concepts, visibly marked in the experience. No checkout, payment, inventory, contact endpoint or order collection is configured. Replace concept content with the verified catalogue before commercial launch.

Stock photography: Unsplash; source URLs and original download checksums are in `asset-sources.json`. Three.js is MIT-licensed; its license header is preserved. Fonts: Cormorant Garamond and Manrope from Google Fonts, with local system fallbacks. `download-assets.py` restores the runtime assets, which are excluded from the source repository.

The Sites deployment is a private review environment. This GitHub repository stores the editable source; it does not yet automatically redeploy Sites on a push.

## Validation

JavaScript syntax and local asset references checked. Browser visual QA was unavailable in the creation environment; verify WebGL rendering, mobile layout and motion on your target devices before a public launch.
