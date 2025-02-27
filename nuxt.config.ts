// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    asyncContext: true,
    //   scanPageMeta: true,
  },
  extends: [
    'github:chrislu-igs/base-layer',
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  runtimeConfig: {
    public: {
      i18n: {
        baseUrl: '',
      },
      apiBaseUrl: '',
      deployEnv: '',
    },
  },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'en-US',
    // langDir: 'locales',
    lazy: true,
    locales: [
      { code: 'en-US', files: ['en-US.json', 'remote.ts'] },
      { code: 'zh-CN', files: ['zh-CN.json', 'remote.ts'] },
    ],
  },

  compatibilityDate: '2025-02-27',
})
