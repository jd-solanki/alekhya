// @ts-check
import antfu from '@antfu/eslint-config'
import regexPlugin from 'eslint-plugin-regex'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue: {
      overrides: {
        'vue/max-attributes-per-line': 'error',
      },
    },
    typescript: true,
    stylistic: {},
  }),
  // Add regex plugin for custom rules
  {
    plugins: {
      regex: regexPlugin,
    }
  },
)
