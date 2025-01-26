import { resolve } from 'pathe'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    zitadel: {
      issuerUrl: process.env.NUXT_ZITADEL_ISSUER_URL || '',
      clientId: process.env.NUXT_ZITADEL_CLIENT_ID || '',
      clientSecret: process.env.NUXT_ZITADEL_CLIENT_SECRET || '',
      scope: process.env.NUXT_ZITADEL_SCOPE || ''
    },
    public: {
      zitadel: {
        active: process.env.NUXT_PUBLIC_ZITADEL_ACTIVE === 'true'
      },
      credentials: {
        active: process.env.NUXT_PUBLIC_CREDENTIALS_ACTIVE === 'true',
        isUsername: process.env.NUXT_PUBLIC_CREDENTIALS_IS_USERNAME === 'true'
      },
      authentication: {
        appName: process.env.NUXT_ZITADEL_AUTHENTICATION_APP_NAME || ''
      }
    }
  },
  alias: {
    '#nuxt-auth': resolve('.')
  },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: true
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  }
})
