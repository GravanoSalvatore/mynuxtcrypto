// export default defineNuxtConfig({
//   router: {
//     scrollBehavior(to, from, savedPosition) {
//       // Если есть сохранённая позиция, переместитесь к ней
//       if (savedPosition) {
//         return savedPosition;
//       } 
//       // Иначе начинайте с начала страницы
//       return { x: 0, y: 0 };
//     }
//   },
//   domains: [
//     'min-api.cryptocompare.com', // пример домена API с изображениями         
//   ],
//   modules: ['@nuxtjs/sitemap','@pinia/nuxt', '@nuxt/image'],
//   sitemap: {
//     hostname: 'https://cryptobulls.com', // Замените на ваш домен
//     gzip: true, // Сжимает sitemap для улучшения производительности
//     routes: async () => {
//       // Опционально: если у вас есть динамические маршруты, можете настроить их здесь
//       const newsRoutes = await fetchNewsRoutes() // предположим, что это ваш асинхронный метод для получения динамических маршрутов
//       return newsRoutes
//     }
//   },
//   pinia: {
//     autoImports: ['defineStore'],
//   },
//   app: {
//     head: {
//       title: 'CryptoBulls - Latest Cryptocurrency News',
//       meta: [
//         { charset: 'utf-8' },
//         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//         { hid: 'description', name: 'description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
//         { name: 'keywords', content: 'cryptocurrency, blockchain, Bitcoin, Ethereum, crypto news, crypto trends' },
//         { name: 'robots', content: 'index, follow' },
        
//         // Open Graph метатеги для соцсетей
//         { property: 'og:title', content: 'CryptoBulls - Latest Cryptocurrency News' },
//         { property: 'og:description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
//         { property: 'og:image', content: '/og-image.png' },
//         { property: 'og:url', content: 'https://cryptobulls.com' },
//         { property: 'og:type', content: 'website' },

//         // Twitter Card метатеги для Twitter
//         { name: 'twitter:card', content: 'summary_large_image' },
//         { name: 'twitter:title', content: 'CryptoBulls - Latest Cryptocurrency News' },
//         { name: 'twitter:description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
//         { name: 'twitter:image', content: '/og-image.png' }
//       ],
//       link: [
//         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
//         { rel: 'preload', href: '/altcoins.webp', as: 'image' },
//         { rel: 'preload', href: '/ai.webp', as: 'image' },
//         { rel: 'preload', href: '/crypto.webp', as: 'image' },
//         { rel: 'preload', href: '/defi.webp', as: 'image' },
//         { rel: 'preload', href: '/it.webp', as: 'image' },
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
//     '@/assets/css/theme.css',
//     'bootstrap/dist/css/bootstrap.min.css',
//   ],
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: false },
//   nitro: {
//     watchOptions: {
//       usePolling: true,
//       interval: 1000,
//       depth: 2,
//     },
//   },
//   vite: {
//     optimizeDeps: {
//       include: ['axios']
//     }
//   }
// });
import axios from 'axios';


async function fetchNewsRoutes() {
  try {
    // Подключение к вашему API
    const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
    const data = response.data.Data;

    // Преобразование данных в формат маршрутов
    const routes = data.map((article) => `/news/${article.id}`); // Например, используем `id` как slug

    return routes;
  } catch (error) {
    console.error('Ошибка при получении маршрутов:', error);
    return [];
  }
}

export default defineNuxtConfig({
  router: {
    scrollBehavior(to, from, savedPosition) {
      // Если есть сохранённая позиция, переместитесь к ней
      if (savedPosition) {
        return savedPosition;
      }
      // Иначе начинайте с начала страницы
      return { x: 0, y: 0 };
    }
  },
  domains: [
    'min-api.cryptocompare.com', // пример домена API с изображениями         
  ],
  modules: ['@nuxtjs/sitemap', '@pinia/nuxt', '@nuxt/image'],
  
  sitemap: {
    hostname: 'https://cryptocurrencybulls.com', // Ваш домен
    gzip: true, // Сжимает sitemap для улучшения производительности
    routes: async () => {
      // Используем асинхронную функцию для добавления динамических маршрутов
      const newsRoutes = await fetchNewsRoutes();
      return newsRoutes;
    }
  },
  
  pinia: {
    autoImports: ['defineStore'],
  },
  
  app: {
    head: {
      title: 'CryptoBulls - Latest Cryptocurrency News',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
        { name: 'keywords', content: 'cryptocurrency, blockchain, Bitcoin, Ethereum, crypto news, crypto trends' },
        { name: 'robots', content: 'index, follow' },
        { name: 'google-site-verification', content: 'XObUUdqlyM3Jepzd5cDkiSgUpELW3pQRPpQjY2folIA' },
        
        // Open Graph метатеги для соцсетей
        { property: 'og:title', content: 'CryptoBulls - Latest Cryptocurrency News' },
        { property: 'og:description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: 'https://cryptobulls.com' },
        { property: 'og:type', content: 'website' },

        // Twitter Card метатеги для Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CryptoBulls - Latest Cryptocurrency News' },
        { name: 'twitter:description', content: 'Stay updated with the latest cryptocurrency news, insights, and trends.' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', href: '/altcoins.webp', as: 'image' },
        { rel: 'preload', href: '/ai.webp', as: 'image' },
        { rel: 'preload', href: '/crypto.webp', as: 'image' },
        { rel: 'preload', href: '/defi.webp', as: 'image' },
        { rel: 'preload', href: '/it.webp', as: 'image' },
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
    '@/assets/css/theme.css',
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
