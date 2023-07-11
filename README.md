<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: nuxt-zookeeper-module
- Package name: nuxt-zookeeper-module
- Description: My new Nuxt module
-->

# 🚧 UNDER CONSTRUCTION 🚧
what I plan for this module

- This module will be able to retrieve zookeeper variables on server start and save them to in in-memory [unstorage](https://github.com/unjs/unstorage) instance.
- variables should be private by default
  -  ⚠️ We can't save to runtimeConfig because that doesn't change at runtime.
  - We can save to storage under a "public" prefix and use `useState` to provide them client side
  - Or we can provide a `/__zookeeper__/variables` api route and provide some utils for fetching from that endpoint



# nuxt-zookeeper-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-zookeeper-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `nuxt-zookeeper-module` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-zookeeper-module

# Using yarn
yarn add --dev nuxt-zookeeper-module

# Using npm
npm install --save-dev nuxt-zookeeper-module
```

2. Add `nuxt-zookeeper-module` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-zookeeper-module'
  ]
})
```

That's it! You can now use nuxt-zookeeper-module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-zookeeper-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-zookeeper-module

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-zookeeper-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-zookeeper-module

[license-src]: https://img.shields.io/npm/l/nuxt-zookeeper-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-zookeeper-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
