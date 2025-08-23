<script lang="ts" setup>
import type { BundledLanguage } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
})

const code = ref('const a = 1;')
const lang = ref<BundledLanguage>('js')
const theme = ref('dracula')

const codePreview = computed(() => highlighter.codeToHtml(code.value, {
  lang: lang.value,
  theme: theme.value,
}))
const encodedCode = computed(() => btoa(
  new TextEncoder().encode(code.value)
    .reduce((data, byte) => data + String.fromCharCode(byte), ''),
))
</script>

<template>
  <div>
    <div
      class="[&>pre]:p-6 [&>pre]:rounded-lg"
      v-html="codePreview"
    />
    <UTextarea v-model="code" />
    <USelectMenu
      v-model="lang"
      :items="Object.keys(bundledLanguages)"
      class="w-48"
    />
    <USelectMenu
      v-model="theme"
      :items="Object.keys(bundledThemes)"
      class="w-48"
    />
    <p>Get it via API: </p>
    <a
      target="_blank"
      :href="`/api/image/code?lang=${lang}&theme=${theme}&code=${encodedCode}`"
    >Visit</a>
  </div>
</template>
