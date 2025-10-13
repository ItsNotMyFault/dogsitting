import { resolve } from 'pathe'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // extends: ['./base/core', './base/nuxt-auth', './base/theme'],
  ssr: true,
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  routeRules: {
    '/api/**': { ssr: true }
  },
  css: [join(currentDir, 'assets/css/main.css')],
  // css: ['@/assets/css/main.css'],
  // css: ['../dogsitting_frontend/assets/css/main.css'],

  alias: {
    '#core': resolve('base/core'),
    '#reservation': resolve('layers/reservation'),
    '#team': resolve('layers/team')
  },

  modules: [
    '@pinia/nuxt' // required
  ],
  typescript: {
    strict: true
  }
})
