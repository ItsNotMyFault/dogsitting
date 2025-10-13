import { resolve } from 'pathe'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL
  },
  alias: {
    '#core': resolve('.')
  },
  modules: ['@nuxtjs/i18n']
})
