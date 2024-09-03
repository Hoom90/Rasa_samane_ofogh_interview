// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['./assets/css/main.css'],
  
  app: {
    head: {
      title: 'رسا سامانه افق',
      charset: 'utf-8',
      meta: [],
      link: [],
    }
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/ui",
    '@pinia/nuxt',
    // '@nuxtjs/axios',
  ],

  pinia: {
    storesDirs: ['./stores/**',
      'stores',
      'stores/*/index.{ts,js,mjs,mts}',
      'stores/**'],
  },

  compatibilityDate: "2024-09-02"
})