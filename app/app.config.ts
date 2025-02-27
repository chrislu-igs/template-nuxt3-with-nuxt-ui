// 這行不要刪除，如果補上 import { defineAppConfig } from '#app/nuxt'，則會導致編譯錯誤
// eslint-disable-next-line unimport/auto-insert
export default defineAppConfig({
  siteName: 'template-nuxt-ui-starter',
  ui: {
    primary: 'lime',
    gray: 'neutral',
  },
})
