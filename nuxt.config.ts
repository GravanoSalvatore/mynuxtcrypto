
import axios from "axios";

async function fetchNewsRoutes() {
  try {
    // Подключение к вашему API
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    );
    // const data = response.data.Data;
    const data = response.data?.Data || [];
    // Преобразование данных в формат маршрутов
    const routes = data.map((article) => `/news/${article.id}`); // Например, используем `id` как slug

    return routes;
  } catch (error) {
    console.error("Ошибка при получении маршрутов:", error);
    return [];
  }
}

export default defineNuxtConfig({

 
  hooks: {
    'render:route': (url, result, context) => {
        const canonicalUrl = `https://cryptocurrencybulls.com${url}`;
        context.res.setHeader("link", `<${canonicalUrl}>; rel="canonical`);
    }
  },
  router: {
    
    scrollBehavior(to, from, savedPosition) {
      // Если есть сохранённая позиция, переместитесь к ней
      if (savedPosition) {
        return savedPosition;
      }
      // Иначе начинайте с начала страницы
      return { x: 0, y: 0 };
    },
  },
  domains: [
    "min-api.cryptocompare.com", // пример домена API с изображениями
  ],
  modules: ["@nuxtjs/sitemap", "@pinia/nuxt", "@nuxt/image"],

  sitemap: {
    hostname: "https://cryptocurrencybulls.com", // Ваш домен
    gzip: true, // Сжимает sitemap для улучшения производительности
    routes: async () => {
      // Используем асинхронную функцию для добавления динамических маршрутов
      const newsRoutes = await fetchNewsRoutes();
      return newsRoutes;
    },
  },

  pinia: {
    autoImports: ["defineStore",'storeToRefs'],
  },

  app: {
    head: {
      title: "Crypto Bulls - Latest Cryptocurrency News",
      meta: [
        // {
        //   hid: "canonical",
        //   rel: "canonical",
        //   href: "https://cryptocurrencybulls.com/", // Основной URL
        // },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Stay updated with the latest cryptocurrency news, insights, and trends.",
        },
        {
          name: "keywords",
          content:
            "cryptocurrency,Defi, Nft, blockchain, Bitcoin, Ethereum,4V.coin,4Vcoin, crypto news, crypto trends",
        },
        { name: "robots", content: "index, follow" },
        {
          name: "google-site-verification",
          content: "XObUUdqlyM3Jepzd5cDkiSgUpELW3pQRPpQjY2folIA",
        },

        // Open Graph метатеги для соцсетей
        {
          property: "og:title",
          content: "Crypto Bulls - Latest Cryptocurrency News",
        },
        {
          property: "og:description",
          content:
            "Stay updated with the latest cryptocurrency news, insights, and trends.",
        },
        { property: "og:image", content: "/og-image.png" },
        { property: "og:url", content: "https://cryptocurrencybulls.com" },
        { property: "og:type", content: "website" },

        // Twitter Card метатеги для Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Crypto Bulls - Latest Cryptocurrency News",
        },
        {
          name: "twitter:description",
          content:
            "Stay updated with the latest cryptocurrency news, insights, and trends.",
        },
        { name: "twitter:image", content: "/og-image.png" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preload", href: "/altcoins.webp", as: "image" },
        { rel: "preload", href: "/ai.webp", as: "image" },
        { rel: "preload", href: "/crypto.webp", as: "image" },
        { rel: "preload", href: "/defi.webp", as: "image" },
        { rel: "preload", href: "/it.webp", as: "image" },
        { rel: "preload", href: "/bull.webp", as: "image" },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
        },
      ],
      script: [
        // {
        //   src: "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.6/lottie.min.js",
        //   defer: true,
        // },
      ],
    },
  },
  build: {
    transpile: ['@nuxtjs/firebase'],
  },
 
  css: ["@/assets/css/theme.css", "bootstrap/dist/css/bootstrap.min.css"],

  compatibilityDate: "2024-04-03",
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
      include: ["axios"],
    },
  },
});







