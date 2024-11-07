<template>
  <div class="container-fluid">
    <h2 v-if="!isLoading" class="fw-bold">Bitcoin and Ethereum News</h2>
    <div class="row">
      <!-- Левая колонка для новостей (шире правой колонки) -->
      <div class="col-12 col-md-4 fixed-sidebar mb-4 mb-md-0" v-if="!isLoading">
        <div class="sidebar-content">
          <div v-for="(newsItem, index) in latestNews.slice(9)" :key="index" class="sidebar-news-item">
            <p>
              <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}
            </p>
            <a :href="newsItem.url" target="_blank" class="mt-auto">
              <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
              <p class="card-text">{{ newsItem.body || 'Описание отсутствует' }}</p>
              <p class="card-text text-muted">{{ formatDate(newsItem.published_on) }}</p>
            </a>
            <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
          </div>
        </div>
      </div>

      <!-- Основная колонка с карточками новостей (две карточки в ряд) -->
      <div class="col-12 col-md-8" ref="newsContainer" v-if="!isLoading">
        <div class="row">
          <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-6 mb-4">
            <div class="card h-100 news-card" style="max-height: 500px;">
              <img
                v-if="newsItem.imageurl"
                :src="newsItem.imageurl"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text text-muted">
                  {{ formatDate(newsItem.published_on) }}
                  <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
                </p>
                <div class="card-content-scroll">
                  <p class="card-text">
                    {{ truncateText(newsItem.body || 'Описание отсутствует', 150) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      latestNews: [],
      currentPage: 1,
      pageSize: 8,
      isLoading: true, // Состояние загрузки
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
    await this.fetchLatestNews();
    this.isLoading = false; // Изменяем на false после загрузки данных
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.news = data.Data.slice(0, 16); // Начинаем с 16-й новости
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
        this.latestNews = data.Data.slice(16, 41); // Последующие новости для правой колонки
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

.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
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
