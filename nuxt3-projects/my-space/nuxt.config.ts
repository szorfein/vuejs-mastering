// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Poppins: [400, 500, 700]
    }
  },
  app: {
    head: { // set the title of the application
      title: 'My Space'
    }
  },
  supabase: {
    redirectOptions: {
      login: 'auth/login',
      callback: '',
      exclude: ['/auth/*']
    }
  }

})
