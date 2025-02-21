import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack/types'
import type { CoreApiResponse, SiteOptions } from '~/types/api'
import { useNuxtApp, useRuntimeConfig } from '#app/nuxt'
import { useLocalStorage, useToast } from '#imports'
import defu from 'defu'
import { FetchError } from 'ofetch'
import { CoreApiErrorResponse } from '~/types/api'

export async function usePublicApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  siteOptions?: SiteOptions,
): Promise<DataT | CoreApiResponse<DataT> | undefined> {
  const { $api, $defaultFetchOptions } = useNuxtApp()
  const params: NitroFetchOptions<NitroFetchRequest> = defu(fetchOptions, $defaultFetchOptions)
  const toast = useToast()
  return $api(url, params)
    .then((res) => {
      // API 層級的錯誤處理
      if (res.Code !== 0) {
        throw new CoreApiErrorResponse(res)
      }

      // 正常回傳解構 Data
      if (res?.Data)
        return res.Data

      // 無 Data 時回傳整個 res
      console.error('[usePublicApi: No Data] ', res)
      return res
    })
    .catch((error: FetchError | CoreApiResponse<any>) => {
      if (siteOptions?.alert) {
        if (error instanceof CoreApiErrorResponse) {
          toast.add({ title: 'API 發生錯誤，CoreApiErrorResponse' })
        }
        if (error instanceof FetchError) {
          toast.add({ title: 'API 發生錯誤，FetchError' })
        }
      }

      return undefined
    })
}

export async function useThirdPartyPublicApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  siteOptions?: SiteOptions,
): Promise<DataT | undefined> {
  const { $api, $defaultFetchOptions } = useNuxtApp()
  const params: NitroFetchOptions<NitroFetchRequest> = defu({
    ...fetchOptions,
    onResponse({ request: url, response }) {
      const res = response._data as DataT

      if (import.meta.client)
        console.trace(`[Response] ${url}: `, res)
    },
  }, $defaultFetchOptions)
  const toast = useToast()
  return $api<DataT>(url, params)
    .then((res) => {
      return res
    })
    .catch((error: FetchError) => {
      if (siteOptions?.alert) {
        if (error instanceof FetchError) {
          toast.add({ title: 'API 發生錯誤，FetchError' })
        }
      }

      return undefined
    })
}

export async function useAuthApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  siteOptions?: SiteOptions,
): Promise<DataT | CoreApiResponse<DataT> | undefined> {
  const token = useLocalStorage('token', '')
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const params: NitroFetchOptions<NitroFetchRequest> = defu(fetchOptions, authConfig)

  return usePublicApi<DataT>(url, params, siteOptions)
}

export async function useLangApi(langCode: string) {
  const config = useRuntimeConfig()
  const langUrl = `${config.public.i18n.baseUrl}/Language/${langCode}?GroupIds[]=TOURNWEB`
  const res = await usePublicApi<Record<string, any>>(langUrl, {}, { alert: true })
  return res
}

export async function useLangErrorApi(langCode: string) {
  const config = useRuntimeConfig()
  const langUrl = `${config.public.i18n.baseUrl}/Language2/${langCode}?GroupIds[]=TOURNWEB`
  const res = await usePublicApi<Record<string, any>>(langUrl, {}, { alert: true })
  return res
}

export async function useLangFetchErrorApi(langCode: string) {
  const langUrl = `https://foo.bar/Language/${langCode}?GroupIds[]=TOURNWEB`
  const res = await usePublicApi<Record<string, any>>(langUrl, {}, { alert: true })
  return res
}

export async function useThirdPartyApi() {
  const url = `https://jsonplaceholder.typicode.com/posts/1`
  const res = await useThirdPartyPublicApi<Record<string, any>>(url, {}, { alert: true })
  return res
}

export async function useThirdPartyErrorApi() {
  const url = `https://jsonplaceholder.typicode.com/postsqwe/1`
  const res = await useThirdPartyPublicApi<Record<string, any>>(url, {}, { alert: true })
  return res
}

// page 裡呼叫
// const { data, pending, error, refresh } = await useAsyncData<T>(
//   '',
//   (): Promise<T> => useTrounApi<T>(),
// )

// 為了向後兼容，保留舊的使用方式
export { usePublicApi as useApi }
