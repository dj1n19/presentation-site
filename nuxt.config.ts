// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true }
// })

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
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

  // App configuration
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

  // Content module configuration
  // content: {
  //   highlight: {
  //     theme: 'github-dark'
  //   }
  // },

  // // UI configuration (Nuxt UI theming)
  // ui: {
  //   icons: ['heroicons', 'lucide']
  // },

  // SEO & Performance
  // routeRules: {
  //   '/': { prerender: true },
  //   '/about': { prerender: true },
  //   '/services': { prerender: true },
  //   '/portfolio': { prerender: true },
  //   '/contact': { prerender: true }
  // }
  routeRules: {
    '/': { prerender: true }
  }
})
