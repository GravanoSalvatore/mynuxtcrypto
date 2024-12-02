<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Левая колонка для новостей (шире правой колонки) -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <h3 v-if="!isLoading" class="text-center my-2 fw-bold">Новости</h3>
        <div class="sidebar-content">
          <div v-for="(newsItem, index) in latestNews" :key="index" class="sidebar-news-item">
            <div class="sidebar-news-card">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="sidebar-news-img"
                alt="news image"
              />  {{ newsItem.author }}
              <p class="card-text ">
                  {{ formatDate(newsItem.publishedAt) }}
                </p>
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
                
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categoryName }}</span>
                <p class="card-text">{{ newsItem.content || 'Описание отсутствует' }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Основная колонка с карточками новостей -->
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-6 col-lg-4 mb-4"
          >
            <div class="car h-100 news-card" style="max-height: 500px;">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  {{ newsItem.author }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text ">
                  {{ formatDate(newsItem.publishedAt) }}
                </p>
                
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categoryName }}</span>
                <!-- <div class="card-content-scroll">
                  <p class="card-text">{{ truncateText(newsItem.description || 'Описание отсутствует', 70) }}</p>
                </div> -->
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
</template>

<script>
export default {
  data() {
    return {
      news: [],
      latestNews: [],
      currentPage: 1,
      pageSize: 9,
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
    await this.fetchLatestNews();
    this.isLoading = false;
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items.slice(12); // Основная колонка начинается с 13-й новости
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.latestNews = data.items.slice(0, 12); // Боковая колонка содержит первые 12 новостей
      } catch (error) {
        console.error("Ошибка при загрузке последних новостей:", error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
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
:root {
  --link-color: #000000; /* Цвет ссылок в светлой теме */
  --text-color: #000000; /* Основной цвет текста в светлой теме */
  --box-shadow-color: rgba(73, 69, 69, 0.3); /* Тень для светлой темы */
  background-color: #ffffff;
}

.dark-mode {
  --link-color: #ffffff; /* Цвет ссылок в тёмной теме */
  --text-color: #ffffff; /* Основной цвет текста в тёмной теме */
  --box-shadow-color: rgba(238, 235, 235, 0.3); /* Светлая тень для тёмной темы */
}

body, .dark-mode {
  color: var(--text-color); /* Использование переменной для цвета текста */
}

/* Стили для ссылок */
a {
  color: var(--link-color); /* Цвет ссылок будет зависеть от темы */
  text-decoration: none;
}

/* Стили для тени карточек */
.car {
  padding: 10px;
  box-shadow: 0 8px 16px var(--box-shadow-color); /* Тень для карточек */
  transition: transform 0.3s, box-shadow 0.3s;
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 20px var(--box-shadow-color); /* Более яркая тень при наведении */
}

.pointer {
  cursor: pointer;
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
