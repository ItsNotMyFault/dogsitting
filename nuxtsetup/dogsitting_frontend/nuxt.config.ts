import { resolve } from 'pathe'

export default defineNuxtConfig({
  // extends: ['./base/core', './base/nuxt-auth', './base/theme'],
  ssr: true,
  alias: {
    '#core': resolve('base/core'),
    '#reservation': resolve('layers/reservation'),
    '#team': resolve('layers/team')
  },

  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  future: {
    compatibilityVersion: 4
  },

  typescript: {
    strict: false
  },

  experimental: {
    renderJsonPayloads: false
  }
})
