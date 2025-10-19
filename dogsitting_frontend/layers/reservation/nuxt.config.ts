import { resolve } from 'pathe'

export default defineNuxtConfig({
  alias: {
    '#reservation': resolve('.')
  },
})
