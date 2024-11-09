
<template>
  <div class="container-fluid">
    <div v-if="isLoading" class="preloader text-white">
      <p>
        <img
          style="width: 300px;"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"
        />
      </p>
    </div>
    <!-- <div class="tradingview-widgets-container">
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:BTCUSDT'" :width="300" :height="300" containerId="tradingview_btc_chart" />
  </div>
 
</div> -->
    <div class="row top">
      
      <!-- Основная колонка с карточками новостей (четыре карточки в ряд) -->
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-6 col-lg-3 mb-4"
          >
            <div class="h-100 news-card" style="max-height: 500px">
              <img
                v-if="newsItem.imageurl"
                :src="newsItem.imageurl"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img"> 
                  {{ newsItem.source_info.name }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text text-muted">
                  {{ formatDate(newsItem.published_on) }}
                </p>
                <span style="font-size:10px;color:cornflowerblue;">
                  {{ truncateCategory(newsItem.categories) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка для оставшихся новостей -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <h3 v-if="!isLoading" class="fw-bold">Latest news</h3>
        <div class="sidebar-content">
          <div
            v-for="(newsItem, index) in remainingNews"
            :key="index"
            class="sidebar-news-item"
          >
            <p>
              <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img"> 
              {{ newsItem.source_info.name }}
            </p>
            <a :href="newsItem.url" target="_blank" class="mt-auto">
              <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
              <p class="card-text text-muted">
                {{ formatDate(newsItem.published_on) }}
              </p>
            </a>
            <span style="font-size:10px;color:cornflowerblue;">
              {{ truncateCategory(newsItem.categories) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="tradingview-widgets-container">
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:BTCUSDT'" :width="300" :height="300" containerId="tradingview_btc_chart" />
  </div>
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:ETHUSDT'" :width="300" :height="300" containerId="tradingview_eth_chart" />
  </div>
  <div class="tradingview-widget">
    <TradingViewChart :symbol="'BINANCE:USDTUSD'" :width="300" :height="300" containerId="tradingview_usdt_chart" />
  </div>
</div> -->
    <br /><br />
  </div>
  
</template>

<script>
import TradingViewChart from './components/Chart.vue';
export default {
  components:{TradingViewChart},
  data() {
    return {
      news: [],
      remainingNews: [],
      currentPage: 1,
      pageSize: 8,
      isLoading: true,
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
    await this.fetchNews();
    this.isLoading = false;
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );
        const data = await response.json();
        this.news = data.Data.slice(15, 23);
        this.remainingNews = data.Data.slice(23);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    truncateCategory(category) {
      return category.length > 20 ? category.slice(0, 50) + "..." : category;
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

.top {
  margin-top: 65px;
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

.sidebar-news-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
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
  .sidebar-content {
    overflow-y: auto;
  }
}
</style>
