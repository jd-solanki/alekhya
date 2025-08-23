# Alekhya

> _Alekhya is sanskrit word which means image in english_

Prototype for generating code images from text using Shiki and Nuxt 4. As a USP it allows you to retrieve code snippet as PNG image via API call thanks to [pi0/shiki-image](https://github.com/pi0/shiki-image).

## 🌐 Retrieve Code Image via API

### 1. Encode your code

  <details>
  <summary>Node</summary>

  ```js
  import { Buffer } from 'node:buffer'

  const code = 'console.log("Hello World!")'
  const encoded = Buffer.from(code).toString('base64')
  ```

  </details>

  <details>
  <summary>JavaScript (Browser)</summary>

  ```js
  const code = 'console.log("Hello World!")'
  const encoded = btoa(
    new TextEncoder().encode(code).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )
  ```

  </details>

  <details>
  <summary>Python</summary>

  ```py
  import base64

  code = 'console.log("Hello World!")'
  encoded = base64.b64encode(code.encode()).decode()
  ```

  </details>

  <details>
  <summary>Other</summary>

  ```plaintext
  take raw code → convert to bytes → encode as Base64
  ```

  </details>

### 2. Craft URL

  ```plaintext
  https://getalekhya.netlify.app/api/image/code?code=<encodedCode>&lang=<yourLang>
  ```

### 3. Make API Request

  Use any of your preferred tools to make API call to above URL

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
