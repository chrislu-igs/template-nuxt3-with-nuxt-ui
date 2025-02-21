<script setup>
import { useAppConfig } from '#app/config'
import { useHead, useHeadSafe } from '#imports'

const appConfig = useAppConfig()
useHead({
  htmlAttrs: {
    // scrollbar-w-2 要放在 scrollbar 前面
    class: ' scrollbar-thumb-primary-300 scrollbar-w-2 scrollbar',
  },
})
useHeadSafe({
  titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - ${appConfig.siteName}` : appConfig.siteName),
})
</script>

<template>
  <slot />
  <UNotifications />
</template>
