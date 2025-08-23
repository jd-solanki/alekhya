import { writeFile } from 'node:fs/promises'
import { codeToImage } from 'shiki-image'

// eslint-disable-next-line antfu/no-top-level-await
const buffer = await codeToImage('console.log("hello, world!");', {
  lang: 'js',
  theme: 'github-dark',
})

// eslint-disable-next-line antfu/no-top-level-await
await writeFile('image.ignore.png', buffer)
