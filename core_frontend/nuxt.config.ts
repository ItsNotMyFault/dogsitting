// core_frontend/nuxt.config.ts
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  extends: [],// This marks the project as a layer
  compatibilityDate: "2025-07-15",

  alias: {
    "@core": "./",
    "#core": currentDir + "/app",
    "~": currentDir + "/app",
  },
  components: [
    {
      path: '~/components',
      global: true  // Make components available to extending projects
    },
  ],
  modules: [
    '@pinia/nuxt', // required
    '@nuxtjs/i18n',
    "@nuxt/ui",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-auth-utils"
  ],
  typescript: {
    strict: true,
    typeCheck: false
  },
  imports: {
    autoImport: true
  }
})
