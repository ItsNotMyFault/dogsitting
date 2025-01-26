import { resolve } from 'pathe'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  alias: {
    '#reservation': resolve('.')
  },
  devtools: { enabled: true }
})
