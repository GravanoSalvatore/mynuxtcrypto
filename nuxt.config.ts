// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   modules: [
//     '@pinia/nuxt',
//   ],
//   pinia: {
//     autoImports: ['defineStore'],
//   },
//   app: {
//     head: {
//       link: [
//         {
//           rel: 'stylesheet',
//           href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css'
//         },
//         {

//           rel: 'stylesheet',
//           href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
//         },
//       ],
//       script: [
//         {
//           src: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.6/lottie.min.js',
//           defer: true
//         }
//       ]
//     }
//   },
//   css: [
//     'bootstrap/dist/css/bootstrap.min.css',
//   ],
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: false},
//   nitro: {
//     watchOptions: {
//       usePolling: true,
//       interval: 1000,
//       depth: 2
//     },
//   },
// });
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore'],
  },
  app: {
    head: {
      title: 'CryptoBulls',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'CryptoBulls', content: 'CryptoBulls' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.6/lottie.min.js',
          defer: true
        }
      ]
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  nitro: {
    watchOptions: {
      usePolling: true,
      interval: 1000,
      depth: 2,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['axios']
    }
  }
});
