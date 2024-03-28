import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@model': fileURLToPath(new URL('./src/model', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@style': fileURLToPath(new URL('./src/assets/style', import.meta.url))
    }
    // alias: [
    //   // { find: '@', replacement: fileURLToPath(new URL('.', import.meta.url)) },
    //   { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    //   // { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
    //   // { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
    //   // { find: '@stores', replacement: fileURLToPath(new URL('./src/shared/stores', import.meta.url)) },
    //   // { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    // ]
  }
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => tag.startsWith('the-')
  //   }
  // }
})
