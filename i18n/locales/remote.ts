import { tryUseNuxtApp, useRuntimeConfig } from '#app/nuxt'
import { defineI18nLocale } from '#imports'

type CoreApiResponse<DataT> = {
  Code: number
  Data: DataT
  Message?: string
}

export default defineI18nLocale(async (locale) => {
  const nuxtApp = tryUseNuxtApp()
  if (!nuxtApp) {
    console.error('Nuxt app not available')
    return {}
  }
  const config = useRuntimeConfig()
  console.log('Loading remote locale inside:', locale, config.public.i18n.baseUrl)
  const langApiUrl = 'https://test-language-api.jlfafafa3.com'
  if (!langApiUrl) {
    console.error('Missing NUXT_PUBLIC_I18N_BASE_URL in runtime config')
    return {}
  }

  try {
    const resp = await $fetch<CoreApiResponse<Record<string, any>>>(`${langApiUrl}/Language/${locale}?GroupIds[]=TOURNWEB`)
    if (resp.Code === 0) {
      return resp.Data?.[locale] || {}
    }
  }
  catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
  }

  return {}
})
