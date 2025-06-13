// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    '~/assets/css/app.css',
    '~/assets/css/main.less',
    '~/assets/css/login.less',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
        },
      ],
    },
    // baseURL: '/profile/'
  },
  ssr: true,
  ignore: [
    '**/data/**',
  ],
  typescript: {
    strict: false,
  },
  plugins: ['~/plugins/toast.client.ts'],
  experimental: {
    componentIslands: true,
  },
  modules: [
    "@vee-validate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
});
