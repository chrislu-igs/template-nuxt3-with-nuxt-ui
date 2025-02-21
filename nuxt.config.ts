// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
  },

  // vite: {
  //   // 停用程式碼最小化
  //   build: {
  //     minify: false,
  //     cssMinify: false,
  //     sourcemap: true,
  //   },
  // },

  // nitro: {
  //   // 停用伺服器端程式碼最小化
  //   minify: false,
  // },

  // imports: {
  //   autoImport: false,
  // },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    asyncContext: true,
    //   scanPageMeta: true,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-eslint-auto-explicit-import',
    '@nuxt/fonts',
    // ['@vueuse/nuxt', { autoImports: false }],
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

  compatibilityDate: '2025-01-20',
})
