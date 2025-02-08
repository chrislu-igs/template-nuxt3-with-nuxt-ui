import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import withNuxt from './.nuxt/eslint.config.mjs'

const compatConfig = new FlatCompat().config({
  extends: [
    'plugin:tailwindcss/recommended',
    // Other extends...
  ],
})

export default withNuxt(
  antfu({
    // Enable stylistic formatting rules
    stylistic: true,

    // Or customize the stylistic rules
    // stylistic: {
    //   indent: 2, // 4, or 'tab'
    //   quotes: 'single', // or 'double'
    // },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    ignores: [
      'scripts/**',
      '.output/**',
      // ...globs
    ],
  }, ...compatConfig,
  // 自訂規則
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js', '**/*.mjs'],
    rules: {
      'no-console': 'off',
      'unused-imports/no-unused-vars': 'off',
      'style/max-statements-per-line': 'off',
      'vue/no-multiple-template-root': 'off',
      'tailwindcss/no-custom-classname': ['error', {
        whitelist: ['ui\\-.*', '(bg|text)\\-.*', '.+\\-primary.*', '@.*'],
      }],
    },
  }),
)
