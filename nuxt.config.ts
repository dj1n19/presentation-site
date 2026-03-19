import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts'
  ],

  app: {
    head: {
      title: 'Administrative Manager | Professional Services',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Professional administrative management services with expertise in operations, team coordination, and business efficiency.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Redirect every route to the under-construction page.
  // To go live: remove all rules except the '/' one and restore it to { prerender: true }
  routeRules: {
    // '/': { redirect: '/under-construction' },
    // '/under-construction': { prerender: true },
    '/': { prerender: true },
    '/cookies-policy': { prerender: true }
  }
})