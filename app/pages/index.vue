<script lang="ts" setup>
import type { BundledLanguage, BundledTheme } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const shikiThemes = Object.keys(bundledThemes) as BundledTheme[]
const shikiLangs = Object.keys(bundledLanguages) as BundledLanguage[]

const route = useRoute()

// SECTION Fetch query params
const code = ref(
  route.query.code
    ? decode(route.query.code as string)
    : DEFAULT_CODE,
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
  langs: Array.from(new Set([lang.value, DEFAULT_LANGUAGE, 'python'])),
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
function openAsAPIResponse() {
  window.open(`${window.location.origin}/api/image/code?${queryParams.value}`)
}
// !SECTION

const codePreview = computed(() => highlighter.codeToHtml(code.value, {
  lang: lang.value,
  theme: theme.value,
}))
const { copy: copyAPIUrl, copied: isAPIURLCopied } = useClipboard({ source: () => `${window.location.origin}/api/image/code?${queryParams.value}` })
const { copy: copyPageUrl, copied: isPageURLCopied } = useClipboard({ source: () => `${window.location.origin}?${queryParams.value}` })
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2 grid sm:grid-cols-2 align-middle mb-8">
      <h1 class="text-3xl font-semibold">
        🖼️ Alekhya
      </h1>
      <UButton
        label="View Programmatic Usage"
        color="neutral"
        trailing-icon="lucide:circle-question-mark"
        variant="subtle"
        href="https://github.com/jd-solanki/alekhya/blob/main/README.md#-retrieve-code-image-via-api"
        target="_blank"
        rel="noopener noreferrer"
        class="sm:place-self-end max-sm:place-self-start max-sm:mt-4 max-sm:row-start-3"
      />
      <p class="text-muted">
        Get code snippets as image via API
      </p>
    </header>
    <div
      class="[&>pre]:p-4 [&>pre]:rounded-lg col-span-2 [&>pre]:overflow-auto"
      v-html="codePreview"
    />
    <UTextarea
      v-model="code"
      class="w-full col-span-2"
      :rows="6"
    />
    <div class="space-x-6">
      <USelectMenu
        :model-value="lang"
        :items="shikiLangs"
        class="sm:w-48 w-36"
        @update:model-value="onLangSelect"
      />
      <USelectMenu
        :model-value="theme"
        :items="shikiThemes"
        class="sm:w-48 w-36"
        @update:model-value="onThemeSelect"
      />
    </div>
    <div class="flex flex-wrap items-center gap-6">
      <UButton
        :icon="isPageURLCopied ? 'lucide:check' : 'lucide:clipboard'"
        @click="() => copyPageUrl()"
      >
        Copy page URL
      </UButton>
      <UButton
        :icon="isAPIURLCopied ? 'lucide:check' : 'lucide:clipboard'"
        @click="() => copyAPIUrl()"
      >
        Copy API URL
      </UButton>
      <UButton
        trailing-icon="lucide:external-link"
        @click="openAsAPIResponse"
      >
        View as API Response
      </UButton>
    </div>
  </div>
</template>
