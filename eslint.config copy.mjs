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
    },
    rules: {
      'regex/invalid': [
        'error',
        [
          {
            regex: 'useUserSession\\(\\)',
            message: 'Prefer `useUserStore()` instead of `useUserSession()`',
            files: { ignore: 'stores\\/user\.ts' },
          },
          {
            regex: 'router\.(push|replace)\((.*)\)',
            message: 'Prefer `navigateTo()` instead of `router.replace()` or `router.push()`',
          },
          {
            regex: '(?<!\\breturn\\s)(?<!\\bawait\\s)\\bnavigateTo\\b',
            message: 'Make sure to always use `await` or `return` on result of `navigateTo` when calling it.',
          },
          {
            regex: 'db.transaction\\(async ',
            message: 'Prefer <entity>_crud over manual db import & initiating transaction.',
          },
          {
            regex: 'import { .*\bdb\b.* }',
            message: 'Do not directly use `db` outside crud directory.',
            files: { ignore: '.*\\/crud\\/.*' },
          },
        ],
      ],
    },
    ignores: ['eslint.config.mjs'],
  },
).overrideRules({
  'node/prefer-global/process': ['error', 'always'],
})
