<script lang="ts" setup>
import type { AccordionItem } from '@nuxt/ui'
import type { BundledLanguage, BundledTheme, createHighlighter } from 'shiki'
import type { SetRequired } from 'type-fest'

const props = defineProps<{ theme: BundledTheme, highlighter: Awaited<ReturnType<typeof createHighlighter>> }>()

function getCodePreview(code: string, lang: BundledLanguage) {
  return props.highlighter.codeToHtml(code, {
    lang,
    theme: props.theme,
  })
}

const items: SetRequired<AccordionItem, 'content'>[] = [
  {
    label: 'NodeJS',
    lang: 'js',
    content: `import { Buffer } from 'node:buffer'

const code = 'console.log("Hello World!")'
const encoded = Buffer.from(code).toString('base64')`,
  },
  {
    label: 'JavaScript (Browser)',
    lang: 'js',
    content: `const code = 'console.log("Hello World!")'
const encoded =  btoa(
    new TextEncoder().encode(code).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
    )
)`,
  },
  {
    label: 'Python',
    lang: 'python',
    content: `import base64

code = 'console.log("Hello World!")'
encoded = base64.b64encode(code.encode()).decode()`,
  },
  {
    label: 'Other',
    lang: 'js',
    content: `// take raw code → convert to bytes → encode as Base64`,
  },
]
</script>

<template>
  <UModal
    title="Programmatic Usage"
    :ui="{ body: 'space-y-8' }"
  >
    <UButton
      label="View Programmatic Usage"
      color="neutral"
      trailing-icon="lucide:circle-question-mark"
      variant="subtle"
    />

    <template #body>
      <div class="space-y-4">
        <h2>
          1. Encode your code
        </h2>
        <UAccordion
          :items="items"
          class="ps-6"
        >
          <template #content="{ item }">
            <div
              class="text-sm [&>pre]:rounded-lg [&>pre]:overflow-auto select-all [&>pre]:p-4"
              v-html="getCodePreview(item.content, item.lang)"
            />
          </template>
        </UAccordion>
      </div>
      <div class="space-y-4">
        <h2>
          2. Craft API URL
        </h2>
        <div
          class="ps-6 text-sm [&>pre]:rounded-lg [&>pre]:overflow-auto select-all [&>pre]:p-4"
          v-html="getCodePreview(`const url = \`https://getalekhya.netlify.app/api/image/code?code=\${encoded}&lang=<yourLang>\``, 'js')"
        />
      </div>
      <h2>3. Make API request using your preferred tool like <UKbd>ofetch</UKbd>, <UKbd>axios</UKbd>, or <UKbd>fetch</UKbd></h2>
    </template>
  </UModal>
</template>
