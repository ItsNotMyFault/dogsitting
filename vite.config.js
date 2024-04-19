import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [vue(), mkcert()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@model': fileURLToPath(new URL('./src/model', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@style': fileURLToPath(new URL('./src/assets/style', import.meta.url))
    }
  }
})
