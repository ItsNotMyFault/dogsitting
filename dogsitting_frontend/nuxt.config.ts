import { resolve } from 'pathe'
// import tailwindcss from "@tailwindcss/vite";
import tailwindcssVitePlugin from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  // in Nuxt 4, the ~ alias resolves to the app/ directory.
  compatibilityDate: "2025-07-15",
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcssVitePlugin() as PluginOption],
  },
  ssr: true,
  extends: ['./layers/reservation'],
  devtools: { enabled: import.meta.env.NODE_ENV === 'development' },
  routeRules: {
    '/api/**': { ssr: true }
  },
  runtimeConfig: {
    public: {
      theme: {
        light: {
          bgLogin: 'https://imgs.search.brave.com/8p1Gl7VS0kVHARA9RVYdw4I3LwrhUlRoeMEUr2HOhi4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzExL0dl/dHR5SW1hZ2VzLTU4/NzQ5MzcyMC5qcGc_/Zml0PTY5Niw0NjQ' // or your desired value
        },
      }
    }
  },


  alias: {
    '#reservation': resolve('layers/reservation'),
    '@style': resolve('./app/assets/style')
  },

  modules: [
    '@pinia/nuxt', // required
    '@nuxtjs/i18n',
    "@nuxt/ui"
  ],
  typescript: {
    strict: true,
    typeCheck: true
  }
})
