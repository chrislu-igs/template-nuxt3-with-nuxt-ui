<script lang="ts" setup>
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
      <UButton icon="i-heroicons-book-open" to="https://ui.nuxt.com" target="_blank">
        Open Nuxt UI Documentation
      </UButton>
    </UCard>
    <UCard class="mb-10 h-[1000px]">
      <div>test</div>
    </UCard>
  </UContainer>
</template>
