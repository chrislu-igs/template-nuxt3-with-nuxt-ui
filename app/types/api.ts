import type { $Fetch, NitroFetchRequest } from 'nitropack/types'
import type { FetchOptions } from 'ofetch'

export type CoreApiResponse<DataT> = {
  Code: number
  Data: DataT
  Message?: string
}

/**
 * API 回應錯誤時的型別 class
 */
export class CoreApiErrorResponse<DataT> implements CoreApiResponse<DataT> {
  Code: number
  Data: DataT
  Message?: string

  constructor(response: CoreApiResponse<DataT>) {
    this.Code = response.Code
    this.Data = response.Data
    this.Message = response.Message
  }
}

export type SiteOptions = {
  alert?: boolean
  thirdParty?: boolean
}

export type DataT = any

// 為了讓 TypeScript 能夠正確推導型別
declare module '#app' {
  interface NuxtApp {
    $api: $Fetch<CoreApiResponse<DataT>, NitroFetchRequest>
    $defaultFetchOptions: FetchOptions
  }
}
