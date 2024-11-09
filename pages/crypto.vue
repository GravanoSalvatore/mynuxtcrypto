
<template>
  <div class="">

    <div v-if="loadingBanner" class="preloader text-white">
      <p>
        <img
          style="width: 300px;"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"
        />
      </p>
    </div>
    <div v-else>
    <div class="banner" v-if="bannerData && bannerData.source_info">
      <div class="banner-content">
       
        <h1 v-if="bannerData.title" class="banner-title">{{ bannerData.title }}</h1>
        <p>
          <img
            v-if="bannerData.source_info.img"
            style="width: 35px; height: 35px;"
            :src="bannerData.source_info.img"
            alt="source image"
          />
          {{ bannerData.source_info.name }}
        </p>
        <p v-if="bannerData.published_on" class="banner-date ">{{ formatDate(bannerData.published_on) }}</p>
     
      </div>
    </div>
    <div class="container-fluid">
      <div class="heading-marquee-container">
        <h2 v-if="!isLoading" class="heading-left fw-bold">BITCOIN & ETHEREUM </h2>

        <!-- Бегущая строка -->
        <div v-if="!isLoading" class="marquee">
          <div class="marquee-content">
            <span v-for="(newsItem, index) in latestNews" :key="index">
              {{ newsItem.title }} &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Левая колонка для новостей (шире правой колонки) -->
        <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
          <div class="sidebar-content">
            <div v-for="(newsItem, index) in latestNews" :key="index" class="sidebar-news-item">
              <div class="sidebar-news-card">
                <img v-if="newsItem.imageurl" :src="newsItem.imageurl" class="sidebar-news-img" alt="news image" />
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
                  <p class="card-text text-muted">{{ formatDate(newsItem.published_on) }}</p>
                  <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
                  <p class="card-text">{{ newsItem.body || 'Описание отсутствует' }}</p>
                </a>
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Основная колонка с карточками новостей -->
        <div class="col-12 col-md-9" ref="newsContainer">
          <div class="tradingview-widgets-container">
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:BTCUSDT'" :width="300" :height="300" containerId="tradingview_btc_chart" />
  </div>
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:ETHUSDT'" :width="300" :height="300" containerId="tradingview_eth_chart" />
  </div>
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'KRAKEN:USDTUSD'" :width="300" :height="300" containerId="tradingview_usdt_chart" />
  </div>
</div>

  <br/>
          <div class="row">
            <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-6 col-lg-4 mb-4">
              <div class="card h-100 news-card" style="max-height: 500px; background-color: #f8f9fa;">
                <img
                  v-if="newsItem.imageurl"
                  :src="newsItem.imageurl"
                  class="card-img-top"
                  alt="news image"
                  style="height: 200px; object-fit: cover;"
                />
                <div class="card-body d-flex flex-column">
                  <p>
                    <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img" /> {{ newsItem.source_info.name }}
                  </p>
                  <a :href="newsItem.url" target="_blank" class="mt-auto">
                    <h5 class="card-title">{{ newsItem.title }}</h5>
                  </a>
                  <p class="card-text text-muted">{{ formatDate(newsItem.published_on) }}</p>

                  <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
                  <div class="card-content-scroll">
                    <p class="card-text">{{ truncateText(newsItem.body || 'Описание отсутствует', 70) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Пагинация -->
          <div v-if="!isLoading" class="d-flex justify-content-center my-3">
            <span class="pointer mx-2" :disabled="currentPage === 1" @click="prevPage">
              <i class="bi bi-arrow-left-square"></i>
            </span>
            <span class="pointer mx-2" :disabled="currentPage === totalPages" @click="nextPage">
              <i class="bi bi-arrow-right-square"></i>
            </span>
          </div>
      
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import TradingViewChart from '../components/Chart.vue';

export default {
  components:{TradingViewChart},
  data() {
    return {
      loadingBanner: true,
      news: [],
      latestNews: [],
      currentPage: 1,
      pageSize: 9,
      isLoading: true,
      bannerData: {}, // Данные для баннера
      bannerNewsIndex: 0, // Индекс текущей новости для баннера
      bannerInterval: null, // Переменная для хранения интервала
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.news.length / this.pageSize);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.news.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchBannerData();
    await this.fetchNews();
    await this.fetchLatestNews();
    this.startBannerRotation(); // Запускаем вращение баннера после загрузки данных
    this.isLoading = false;
  },
  beforeUnmount() {
    clearInterval(this.bannerInterval); // Очищаем интервал при размонтировании компонента
  },
  methods: {
    async fetchBannerData() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.latestNews = data.Data;
        this.bannerData = this.latestNews[0]; // Устанавливаем первую новость для баннера
        this.loadingBanner = false;
      } catch (error) {
        console.error("Ошибка при загрузке данных для баннера:", error);
        this.loadingBanner = false;
      }
    },
    startBannerRotation() {
      this.bannerInterval = setInterval(() => {
        this.bannerNewsIndex = (this.bannerNewsIndex + 1) % this.latestNews.length;
        this.bannerData = this.latestNews[this.bannerNewsIndex];
      }, 10000); // Меняем новость каждые 10 секунд
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.news = data.Data.slice(12); // Основная колонка начинается с 13-й новости
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.latestNews = data.Data.slice(0, 12); // Боковая колонка содержит первые 12 новостей
      } catch (error) {
        console.error("Ошибка при загрузке последних новостей:", error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      const newsContainer = this.$refs.newsContainer;
      if (newsContainer) {
        newsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};

</script>

<style scoped>
.tradingview-widgets-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap; /* Чтобы не было переноса на больших экранах */
}

.tradingview-widget {
  /* width: 400px;
  height: 400px; */
}

@media (max-width: 768px) {
  .tradingview-widgets-container {
    flex-direction: column; /* Размещаем графики один под другим на мобильных устройствах */
    align-items: center; /* Центрируем графики по горизонтали */
  }

  .tradingview-widget {
    width: 100%; /* Графики занимают всю ширину на мобильных устройствах */
    max-width: 400px;
  }
}

.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #091520;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.heading-marquee-container {
  display: flex;
  align-items: center;
}

.marquee {
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
}

.marquee-content {
  display: inline-block;
  animation: marquee 115s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Адаптация для мобильных устройств */
@media (max-width: 767px) {
  .heading-marquee-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .marquee {
    width: 100%;
  }
}
.banner {
  margin-top: 58px;
  background-image: url('../public/crypto.webp');
  background-size: cover; /* Заполняет баннер, сохраняя пропорции */
  background-position: center;
  background-repeat: no-repeat;
  height: 70vh; /* Высота в процентах от высоты экрана */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.5);
}

@media (max-width: 767px) {
  .banner {
    height: 30vh; /* Меньшая высота на мобильных устройствах */
  }
}


.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%; /* Ограничиваем ширину контента */
}

.banner-title {
  font-size: 2rem;
  margin: 0;
  transition: opacity 2s ease-in-out;
  word-wrap: break-word; /* Перенос длинных слов */
}

.banner-date {
  font-size: 1.2rem;
  margin-top: 10px;
  /* opacity: 0.8; */
}

/* Адаптация для мобильных устройств */
@media (max-width: 767px) {
  .banner {
    height: 30vh; /* Меньшая высота на мобильных устройствах */
    padding: 10px;
  }

  .banner-content {
    padding: 10px;
    max-width: 100%; /* Максимальная ширина для баннера */
  }

  .banner-title {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.2rem; /* Уменьшаем размер шрифта заголовка */
    margin: 5px 0;
  }

  .banner-date {
    font-size: 0.9rem; /* Уменьшаем размер шрифта даты */
  }

  .banner-content p,
  .banner-content img {
    font-size: 0.8rem; /* Уменьшаем размер шрифта для текста */
    max-width: 80%; /* Ограничиваем ширину изображения */
  }
}


.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black;
}

.fixed-sidebar {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

.sidebar-news-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.sidebar-news-img {
  width: 100%;
  height: auto;
}

.sidebar-news-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
}

.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-content-scroll {
  max-height: 100px;
  overflow-y: auto;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
}

@media (max-width: 767px) {
  .fixed-sidebar {
    max-height: auto;
    position: static;
  }
  .sidebar-content,
  .card-content-scroll {
    overflow-y: auto;
  }
}
</style>
