import fs from 'node:fs'
import { defineNuxtModule, useRuntimeConfig } from '@nuxt/kit'

// 存實體檔案
function save(fileName, dir, data) {
  const filePath = `${dir}/locales`
  // 建立必要路徑
  fs.mkdirSync(filePath, { recursive: true })
  // 寫入
  fs.writeFile(`${filePath}/${fileName}`, data, (error) => {
    if (error) {
      console.log(`create i18n files error: ${error}`)
    }
    else {
      console.log(`create ${fileName} i18n files complete.`)
    }
  })
}
async function getLocaleMessages(locale, url) {
  let data = {}

  try {
    const resp = await fetch(`${url}/Language/${locale}?GroupIds[]=TOURNWEB`)
    const respJon = await resp.json()
    if (respJon.Code === 0) {
      data = respJon.Data?.[locale] || {}
    }
    else {
      data = {}
    }
  }
  catch (error) {
    console.log(`fetch ${locale} from ${url} error`, error)
    data = {}
  }

  return data
}

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('build:before', () => {
      console.log('Building before...')
      const config = useRuntimeConfig()
      const langApiUrl = config.public.i18n.baseUrl
      const files = nuxt.options.i18n.locales.map(item => ({ filename: `${item.code}.json`, locale: item.code }))
      files.forEach((item) => {
        getLocaleMessages(item.locale, langApiUrl).then((data) => {
          save(item.filename, `${nuxt.options.rootDir}/i18n`, JSON.stringify(data, null, 2))
        })
      })
    })
  },
})
