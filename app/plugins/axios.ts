import axios from 'axios' // ✅ import axios

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
  })

  return {
    provide: {
      axios: api,
    },
  }
})
