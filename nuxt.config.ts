// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
  },

  future: {
    compatibilityVersion: 4,
  },

  // experimental: {
  //   scanPageMeta: true,
  // },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
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
    },
  },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'en-US',
    lazy: true,
    locales: [
      { code: 'en-US', files: ['en-US.json', 'remote.ts'] },
      { code: 'zh-CN', files: ['zh-CN.json', 'remote.ts'] },
    ],
  },

  compatibilityDate: '2025-01-20',
})
