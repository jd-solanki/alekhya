export default defineAppConfig({
  ui: {
    colors: {
      primary: 'black',
      neutral: 'neutral',
    },
    card: {
      slots: {
        root: 'py-4 sm:*:py-6',
        header: '!py-0',
        body: '!py-0',
        footer: '!py-0',
      },
      variants: {
        variant: {
          outline: {
            root: 'divide-none gap-6 flex flex-col',
          },
        },
      },
    },
  },
})
