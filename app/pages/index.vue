<script lang="ts" setup>
import type { BundledLanguage, BundledTheme } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const route = useRoute()
const shikiThemes = Object.keys(bundledThemes)
const shikiLangs = Object.keys(bundledLanguages)

const { copy, copied } = useClipboard()

const highlighter = await createHighlighter({
  themes: shikiThemes,
  langs: shikiLangs,
})

const code = ref(
  route.query.code
    ? decode(route.query.code as string)
    : 'console.log(\'Hello, world!\');',
)
const lang = ref<BundledLanguage>(
  shikiLangs.includes(route.query.lang as string)
    ? (route.query.lang as BundledLanguage)
    : 'js',
)
const theme = ref(
  shikiThemes.includes(route.query.theme as string)
    ? (route.query.theme as BundledTheme)
    : 'dracula',
)

const codePreview = computed(() => highlighter.codeToHtml(code.value, {
  lang: lang.value,
  theme: theme.value,
}))

const encodedCode = computed(() => encode(code.value))
function copyUrl() {
  copy(`${window.location.origin}/?lang=${lang.value}&theme=${theme.value}&code=${encodedCode.value}`)
}

function openAsAPIResponse() {
  window.open(`${window.location.origin}/api/image/code?lang=${lang.value}&theme=${theme.value}&code=${encodedCode.value}`)
}
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-2 gap-6">
      <div
        class="[&>pre]:p-4 [&>pre]:rounded-lg col-span-2"
        v-html="codePreview"
      />
      <UTextarea
        v-model="code"
        class="w-full col-span-2"
        :rows="6"
      />
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
    </div>
    <div class="flex items-center gap-6">
      <UButton
        :icon="copied ? 'lucide:check' : 'lucide:clipboard'"
        @click="copyUrl"
      >
        Copy URL
      </UButton>
      <UButton
        trailing-icon="lucide:external-link"
        @click="openAsAPIResponse"
      >
        Get as API Response
      </UButton>
    </div>
  </div>
</template>
