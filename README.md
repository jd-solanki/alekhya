# Alekhya

> _Alekhya is sanskrit word which means image in english_

Prototype for generating code images from text using Shiki and Nuxt 4. As a USP it allows you to retrieve code snippet as PNG image via API call thanks to [pi0/shiki-image](https://github.com/pi0/shiki-image).

## 🌐 Retrieve Code Image via API

```ts
import { Buffer } from 'node:buffer'

const complexCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`

const encoded = Buffer.from(complexCode).toString('base64')

// 🏗️ Production domain WIP. You can use it with local clone.
console.log(`https://alekhya.com/api/image/code?code=${encoded}&lang=js`)
```

### Why

- You can generate code snippet in your build pipeline or automation
- Directly render various code snippets as image in your docs
- _Add PR for your ideas_ 😜

### Supported query params

- `code`: The base64 encoded code to generate an image for.
- `lang`: The programming language of the code (e.g., js, python).
- `theme`: The theme to use for the code image (e.g., dracula, github).

### Supported languages & themes

- Check [shiki's supported languages](https://shiki.style/languages) for a full list of supported languages.
- Check [shiki's supported themes](https://shiki.style/themes) for a full list of supported themes.

## 🎯 Goal

- [ ] Code image generator
  - [ ] Allow downloading, copying images in various formats
  - [ ] Add UI like editor window
  - [ ] more...
- [-] Provide API to retrieve code images
  - [x] API with basic features
  - [ ] Allow UI customization

> _Proudly powered by Nuxt 4_ ✨
