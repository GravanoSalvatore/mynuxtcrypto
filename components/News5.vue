<template>
  <div class="container-fluid">
    <div v-if="isLoading" class="preloader text-white">
      <p>
        <img
          style="width: 300px"
          src="../public/bull.webp"
        />
      </p>
    </div>
    <div v-else class="row top">
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-6 col-lg-3 mb-4"
          >
            <div class="h-100 news-card" style="max-height: 500px">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <!-- <img
                    style="width: 35px; height: 35px"
                    :src="newsItem.source.uiTitle"
                  /> -->
                  {{ newsItem.source.uiTitle }}<br/>
                  {{ newsItem.author }}
                </p>

                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text ">
                  {{ formatDate(newsItem.publishedAt) }}
                </p>
                <span style="font-size: 10px; color: cornflowerblue">
                  {{ truncateCategory(newsItem.tags) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <h3 v-if="!isLoading" class="fw-bold">Главное сегодня</h3>
        <div class="sidebar-content">
          <div
            v-for="(newsItem, index) in remainingNews"
            :key="index"
            class="sidebar-news-item"
          >
            <p>
              <!-- <img
                style="width: 35px; height: 35px"
                :src="newsItem.source.uiTitle"
              /> -->
              {{ newsItem.source.uiTitle }}
            </p>
            <NuxtLink :to="`/news/${newsItem.id}`" class="mt-auto">
              <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
              <p class="card-text ">
                {{ formatDate(newsItem.publishedAt) }}
              </p>
            </NuxtLink>
            <span style="font-size: 10px; color: cornflowerblue">
              {{ truncateCategory(newsItem.tags) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import TradingViewChart from "./components/Chart.vue";
export default {
  components: { TradingViewChart },
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
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items.slice(0, 8);
        this.remainingNews = data.items.slice(8);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
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
    truncateCategory(tags) {
      const categories = tags.map(tag => tag.name).join(", ");
      return categories.length > 50 ? categories.slice(0, 50) + "..." : categories;
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
/* Ваши стили остаются такими же */
</style>

<style scoped>
:root {
  --link-color: #000000; /* Цвет ссылок в светлой теме */
  --text-color: #000000; /* Основной цвет текста в светлой теме */
  background-color: #ffffff;
}

.dark-mode {
  --link-color: #ffffff; /* Цвет ссылок в тёмной теме */
  --text-color: #ffffff; /* Основной цвет текста в тёмной теме */
  background-color: #8a0d0d;
}

body, .dark-mode {
  color: var(--text-color); /* Использование переменной для цвета текста */
}

/* Стили для ссылок */
a {
  color: var(--link-color); /* Цвет ссылок будет зависеть от темы */
  text-decoration: none;
}

a:hover {
  /* text-decoration: underline; */
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

.top {
  margin-top: px;
}
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  /* color: black; */
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
  /* background-color: #f8f9fa; */
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
  /* color: #6c757d; */
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
