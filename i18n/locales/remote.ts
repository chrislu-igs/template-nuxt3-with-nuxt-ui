const url = import.meta.env.NUXT_PUBLIC_I18N_BASE_URL
console.log('Loading remote locale:', url)
console.log('Loading remote locale import.meta.env:', import.meta.env)
export default defineI18nLocale(async (locale) => {
  const config = useRuntimeConfig()
  console.log('Loading remote locale inside:', locale, url, config.public.i18n.baseUrl)
  const langApiUrl = 'https://test-language-api.jlfafafa3.com'
  if (!langApiUrl) {
    console.error('Missing NUXT_PUBLIC_I18N_BASE_URL in runtime config')
    return {}
  }

  try {
    const resp = await $fetch<CoreApiResponse>(`${langApiUrl}/Language/${locale}?GroupIds[]=TOURNWEB`)
    if (resp.Code === 0) {
      return resp.Data?.[locale] || {}
    }
  }
  catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
  }

  return {}
})
