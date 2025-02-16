// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@nuxt/image'
  ],
  site: {
    url: 'http://localhost:3000',
    name: `Let's cook - Many repipes on many country`,
    description: `Dive into a world of flavors`,
    defaultLocale: 'en'
  },
  sitemap: {
    sources: ['http://localhost:3000/api/__sitemap__/urls']
 }
})
