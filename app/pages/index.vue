<script lang="ts" setup>
import type { BundledLanguage, BundledTheme } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const { copy, copied } = useClipboard()

const shikiThemes = Object.keys(bundledThemes) as BundledTheme[]
const shikiLangs = Object.keys(bundledLanguages) as BundledLanguage[]

const route = useRoute()

// SECTION Fetch query params
const code = ref(
  route.query.code
    ? decode(route.query.code as string)
    : 'console.log(\'Hello, world!\');',
)
const lang = ref<BundledLanguage>(
  shikiLangs.includes(route.query.lang as BundledLanguage)
    ? (route.query.lang as BundledLanguage)
    : DEFAULT_LANGUAGE,
)
const theme = ref(
  shikiThemes.includes(route.query.theme as BundledTheme)
    ? (route.query.theme as BundledTheme)
    : DEFAULT_THEME,
)
// !SECTION

// SECTION Shiki Highlight
const highlighter = await createHighlighter({
  themes: [theme.value],
  langs: [lang.value],
})
async function onLangSelect(selectedLang: BundledLanguage) {
  if (!highlighter.getLoadedLanguages().includes(selectedLang)) {
    await highlighter.loadLanguage(selectedLang)
  }
  lang.value = selectedLang
}
async function onThemeSelect(selectedTheme: BundledTheme) {
  if (!highlighter.getLoadedThemes().includes(selectedTheme)) {
    await highlighter.loadTheme(selectedTheme)
  }
  theme.value = selectedTheme
}
// !SECTION

// SECTION Copy & Open URL
const queryParams = computed(() => {
  const searchParams = new URLSearchParams({
    ...(lang.value === DEFAULT_LANGUAGE ? {} : { lang: lang.value }),
    ...(theme.value === DEFAULT_THEME ? {} : { theme: theme.value }),
    code: encode(code.value),
  })

  return searchParams.toString()
})

// NOTE: Use as func to avoid having missing `window` error on SSR
function copyUrl() {
  copy(`${window.location.origin}/?${queryParams.value}`)
}

// NOTE: Use as func to avoid having missing `window` error on SSR
function openAsAPIResponse() {
  window.open(`${window.location.origin}/api/image/code?${queryParams.value}`)
}
// !SECTION

const codePreview = computed(() => highlighter.codeToHtml(code.value, {
  lang: lang.value,
  theme: theme.value,
}))
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
      <div>
        <USelectMenu
          :model-value="lang"
          :items="shikiLangs"
          class="w-48"
          @update:model-value="onLangSelect"
        />
        <USelectMenu
          :model-value="theme"
          :items="shikiThemes"
          class="w-48"
          @update:model-value="onThemeSelect"
        />
      </div>
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
