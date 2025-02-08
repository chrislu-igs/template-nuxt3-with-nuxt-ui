import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { ref } from 'vue'

export function useUseExample() {
  return ref()
}

export function useGroupId(route: RouteLocationNormalizedLoaded<string | symbol>) {
  const $route = route || useRoute()
  const $config = useRuntimeConfig()
  console.log('useGroupId $route.query.group:', $route.query.group)
  console.log('useGroupId defaultGroupId:', $config.public.defaultGroupId)
  // Get the group id from the query string or runtime config
  return $route.query.group || $config.public.defaultGroupId
}
