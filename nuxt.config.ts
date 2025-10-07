import vuetify from 'vite-plugin-vuetify'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-10-07',

  app: {
    head: {
      title: 'CapstoneII',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 3 + Vuetify + Axios + TailwindCSS' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/css/main.css', 
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

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
    plugins: [
      vuetify({ autoImport: true }),
      tsconfigPaths(), // ✅ added for correct alias resolution
    ],
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
