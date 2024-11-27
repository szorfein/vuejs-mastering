// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@nuxt/ui', '@pinia/nuxt'],
  googleFonts: {
    families: {
      Roboto: [100, 300, 400, 700, 900]
    }
  },
  runtimeConfig: {
    public: {
      weatherApiKey: 'xxx-xxx'
    }
  }
})