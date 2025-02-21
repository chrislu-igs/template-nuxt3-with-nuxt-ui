import type { FetchOptions } from 'ofetch'
import type { CoreApiResponse, DataT } from '~/types/api'
import { defineNuxtPlugin, useRuntimeConfig } from '#app/nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const defaults: FetchOptions = {
    method: 'get',
    baseURL: config.public.apiBaseUrl,
    retry: false,
    onRequest({ request: url, options }) {
      const { body, params, method } = options

      if (import.meta.client)
        console.trace(`[Request][${method}] ${url}: data = `, body || params, options)
    },

    onRequestError({ request: url, options }) {
      const { body, params, method } = options

      if (import.meta.client)
        console.trace(`[Request Error][${method}] ${url}: data = `, body || params, options)
    },

    onResponse({ request: url, response, options }) {
      const res = response._data as CoreApiResponse<any>
      const { method } = options

      if (import.meta.client)
        console.trace(`[Response][${method}] ${url}: `, res)
    },

    onResponseError({ request: url, response, options }) {
      const { method } = options
      if (import.meta.client)
        console.trace(`[Response Error][${method}] ${url}: `, response)
    },
  }

  const api = $fetch.create<CoreApiResponse<DataT>>(defaults)

  nuxtApp.provide('api', api)
  nuxtApp.provide('defaultFetchOptions', defaults)
})
