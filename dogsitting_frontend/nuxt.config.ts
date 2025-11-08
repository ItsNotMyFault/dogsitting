// dogsitting_frontend/nuxt.config.ts
import { resolve } from 'pathe'
import tailwindcssVitePlugin from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  // in Nuxt 4, the ~ alias resolves to the app/ directory.
  compatibilityDate: "2025-07-15",
  css: ['./app/assets/main.css'],
  vite: {
    plugins: [tailwindcssVitePlugin() as PluginOption],
  },
  routeRules: {
    "/api/**": { ssr: true }
  },
  ssr: true,
  extends: ['./layers/reservation', "../core_frontend"],
  devtools: { enabled: import.meta.env.NODE_ENV === 'development' },
  runtimeConfig: {
    public: {
      apiUrl: import.meta.env.NUXT_API_URL || "https://localhost:5188",
      theme: {
        light: {
          bgLogin: 'https://imgs.search.brave.com/8p1Gl7VS0kVHARA9RVYdw4I3LwrhUlRoeMEUr2HOhi4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzExL0dl/dHR5SW1hZ2VzLTU4/NzQ5MzcyMC5qcGc_/Zml0PTY5Niw0NjQ' // or your desired value
        },
      }
    }
  },
  imports: {
    autoImport: true
  },
  // devServer: {
  //   proxy: {
  //     '/api': 'https://localhost:5188'
  //   }
  // },
  alias: {
    '#reservation': resolve('layers/reservation'),
    '@style': resolve('./app/assets/style'),
    '#core': resolve('../core_frontend/app') // Access core files
  },

  modules: [
    '@pinia/nuxt', // required
    '@nuxtjs/i18n',
    "@nuxt/ui",
    "pinia-plugin-persistedstate/nuxt",
  ],
  typescript: {
    strict: false,
    typeCheck: false
  }
})
