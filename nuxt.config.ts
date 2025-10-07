import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      title: 'CapstoneII',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 4 + Vuetify + Axios' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['vuetify/lib/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  plugins: [
    '~/plugins/vuetify',
    '~/plugins/axios',
  ],

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [vuetify({ autoImport: true })],
    server: {
      proxy: {
        '/api': {
          target: 'https://capstone-nd-2.onrender.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },
})
