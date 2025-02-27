<script lang="ts" setup>
import type { ThirdPartyDataPost } from '~/types/api'
import { useAsyncData } from '#app/composables/asyncData'
import { useLogger } from '#imports'
import { useMouse } from '@vueuse/core'
import { useLangApi, useLangFetchErrorApi, useProjectErrorApi, useThirdPartyApi, useThirdPartyErrorApi } from '~/composables/api'

const logger = useLogger().withTag('home page')

const { x, y } = useMouse()

// 頁面級別的 API，供整個頁面使用，可使用多個 $fetch API 組成
const { data, refresh } = await useAsyncData<ThirdPartyDataPost>('dataKey', async () => {
  const res = await useThirdPartyApi() as ThirdPartyDataPost || undefined
  return res
})

// 只會透過按鈕觸發的 API 不用需要包裝在 useFetch or useAsyncData
async function openNormal() {
  const result = await useLangApi('zh-CN')
  logger.log('page call: ', result)
}
async function openApiError() {
  const result = await useProjectErrorApi('zh-CN')
  logger.log('page call: ', result)
}
async function openFetchError() {
  const result = await useLangFetchErrorApi('zh-CN')
  logger.log('page call: ', result)
}
async function openThirdParty() {
  const result = await useThirdPartyApi()
  logger.log('page call: ', result)
}
async function openThirdPartyError() {
  const result = await useThirdPartyErrorApi()
  logger.log('page call: ', result)
}
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>
          <ColorScheme><USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" /></ColorScheme>
        </div>
      </template>
      <div class="flex flex-col items-center space-y-4">
        <UButton icon="i-heroicons-book-open" @click="openNormal">
          Trigger API
        </UButton>
        <UButton icon="i-heroicons-book-open" @click="openApiError">
          Trigger API With API Error
        </UButton>
        <UButton icon="i-heroicons-book-open" @click="openFetchError">
          Trigger API With Fetch Error
        </UButton>
        <UButton icon="i-heroicons-book-open" @click="openThirdParty">
          Trigger API With ThirdParty
        </UButton>
        <UButton icon="i-heroicons-book-open" @click="openThirdPartyError">
          Trigger API With ThirdParty Error
        </UButton>
        <div>
          <p>Mouse Position: {{ x }}, {{ y }}</p>
        </div>
        <div v-if="data">
          <UButton icon="i-heroicons-book-open" @click="refresh">
            Refresh Data
          </UButton>
          <p>Async Data:</p>
          <p>ID:{{ data.id }} Author by User:{{ data.userId }}</p>
          <div>Title: <UInput v-model="data.title" /></div>
          <p>Content: {{ data.body }}</p>
        </div>
      </div>
    </UCard>
    <UCard class="mb-10 h-[1000px]">
      <div>test</div>
      <ExampleComponentA />
    </UCard>
  </UContainer>
</template>
