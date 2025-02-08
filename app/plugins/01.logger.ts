import { createConsola } from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp

  const route = useRoute()
  const $config = useRuntimeConfig()
  const logger = createConsola()
  const isProduction = $config.public.deployEnv === 'production'

  // logger.addReporter({
  //   log: (logObj) => {
  //     store.commit('errorHandle/addConsole', logObj)
  //   }
  // })

  if (isProduction) {
    logger.level = 0
  }
  if (isProduction && route.query.debug) {
    logger.level = 5
  }

  logger.wrapConsole()
})
