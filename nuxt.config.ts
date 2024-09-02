// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['./assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/ui",
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**',
      'stores',
      'stores/*/index.{ts,js,mjs,mts}',
      'stores/**'],
  },

  compatibilityDate: "2024-09-02"
})