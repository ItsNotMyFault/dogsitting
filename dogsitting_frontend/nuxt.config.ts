import { resolve } from 'pathe'
import tailwindcssVitePlugin from '@tailwindcss/vite'
import type { PluginOption } from 'vite'

export default defineNuxtConfig({
  // in Nuxt 4, the ~ alias resolves to the app/ directory.
  // extends: ['./base/core', './base/nuxt-auth', './base/theme'],
  ssr: true,
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  routeRules: {
    '/api/**': { ssr: true }
  },
  vite: {
    plugins: [tailwindcssVitePlugin() as PluginOption],
    build: {
      // Configure sourcemap generation to avoid warnings from CSS plugins
      sourcemap: process.env.NODE_ENV === 'development'
    }
  },
  css: ['~/assets/main.css'],
  // css: ['@/assets/css/main.css'],
  // css: ['../dogsitting_frontend/assets/css/main.css'],

  alias: {
    '#core': resolve('base/core'),
    '#reservation': resolve('layers/reservation'),
    '#team': resolve('layers/team'),
    '@style': resolve('./app/assets/style')
  },

  modules: [
    '@pinia/nuxt', // required
    '@nuxtjs/i18n'
  ],
  typescript: {
    strict: true
  }
})
