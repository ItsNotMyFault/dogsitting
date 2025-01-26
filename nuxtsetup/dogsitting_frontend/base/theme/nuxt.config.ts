import { resolve } from 'pathe'
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '#theme': resolve('.')
  }
})
