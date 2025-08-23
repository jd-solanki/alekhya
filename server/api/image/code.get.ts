import { Buffer } from 'node:buffer'
import { codeToImage } from 'shiki-image'

export default defineEventHandler(async (event) => {
  // Get code from query parameters, with fallback to default
  const query = getQuery(event)
  const theme = query.theme || 'dracula'
  const lang = query.lang || 'js'
  const encodedCode = (query.code as string) || 'Y29uc29sZS5sb2coJ0hlbGxvLCB3b3JsZCEnKTs='
  const code = Buffer.from(encodedCode, 'base64').toString('utf-8')

  // Generate the code image
  const buffer = await codeToImage(code, {
    lang: lang as any,
    theme: theme as any,
    style: { borderRadius: 0 },
    font: 'https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2',
  })

  // Set the response headers for PNG image
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Content-Length', buffer.length)

  // Return the image buffer
  return buffer
})
