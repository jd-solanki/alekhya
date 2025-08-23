import type { BundledLanguage, BundledTheme } from 'shiki'
import { Buffer } from 'node:buffer'
import { Renderer } from '@takumi-rs/core'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'
import { codeToImageCore, loadFont } from 'shiki-image/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const shikiThemes = Object.keys(bundledThemes)
const shikiLangs = Object.keys(bundledLanguages)

export default defineEventHandler(async (event) => {
  // Get code from query parameters, with fallback to default
  const query = getQuery(event)

  const queryTheme = typeof query.theme === 'string' ? query.theme : DEFAULT_THEME
  const theme = shikiThemes.includes(queryTheme) ? queryTheme as BundledTheme : DEFAULT_THEME

  // const queryLang = query.lang || 'js'
  const lang = typeof query.lang === 'string' ? query.lang : DEFAULT_LANGUAGE
  if (!shikiLangs.includes(lang)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid language' })
  }

  const encodedCode = (query.code as string) || 'Y29uc29sZS5sb2coJ0hlbGxvLCB3b3JsZCEnKTs='
  const code = Buffer.from(encodedCode, 'base64').toString('utf-8')

  const highlighter = await createHighlighter({
    themes: [theme],
    langs: [lang],
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
  })

  const fontData = await loadFont(DEFAULT_FONT)
  const renderer = new Renderer({ fonts: [fontData] })

  // Generate the code image
  const buffer = await codeToImageCore(code, {
    lang: lang as BundledLanguage,
    theme,
  }, { highlighter, renderer })

  // Set the response headers for PNG image
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Content-Length', buffer.length)

  // Return the image buffer
  return buffer
})
