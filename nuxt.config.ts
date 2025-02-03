// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
  },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2025-01-20',
})
