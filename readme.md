# nightlight

<a href="https://www.npmjs.com/package/nightlight"><img align="center" src="https://img.shields.io/npm/v/nightlight.svg" alt="NPM version"></a>
<a href="https://bundlephobia.com/result?p=nightlight@latest"><img align="center" src="https://img.shields.io/bundlephobia/minzip/nightlight/latest.svg" alt="Bundle size"></a>
<a href="./license.md"><img align="center" src="https://img.shields.io/npm/l/nightlight.svg" alt="License"></a>

Nightlight helps your favicon switch between light and dark mode.

### Context

Browsers don't provide a native way to switch favicons between light and dark modes. Some people have started [embedding media queries in SVGs](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/), but low browser support for SVG favicons means you'll need a PNG or ICO fallback anyways. And even if SVGs did work, Safari complicates the situation by using `rel="mask-icon"` icons, which require color to be defined as an HTML attribute.

This package is a light, dependency-free snippet for switching your favicon based on CSS media queries.

### Installation

```bash
npm install nightlight
```

Better yet, [copy-and-paste](./src/index.ts) the 20 lines behind this package into your site. Often times a little copy-and-pasting is [better than a linked dependency](https://research.swtch.com/deps).

### Usage

Tag your favicon and mask-icons with `data-dark-href` and `data-dark-color` attributes:

<!-- prettier-ignore -->
```html
<link rel="icon" type="image/png" href="/favicon.png" data-dark-href="/favicon-dark.png" />
<link rel="mask-icon" href="favicon-mask.svg" color="#212121" data-dark-color="#f2f2f2" />
```

Then, import this package from your bundle. No configuration needed. It'll run on import, updating your icon to match the users' current theme.

```javascript
import "nightlight";
```

### Browser Support

Nightlight supports every browser that supports the `prefers-color-scheme` media query ([caniuse](https://caniuse.com/prefers-color-scheme)): Chrome 76+, Firefox 67+, Safari 12.1+, and Edge 79+. On browsers that don't, nightlight simply does nothing.

Unfortunately, Safari and IE don't allow dynamically changing favicons after page load. With Nightlight, they'll use the correct theme favicon on first load, but won't respond to theme changes after that.

### License

MIT
