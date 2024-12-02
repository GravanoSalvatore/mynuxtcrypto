<template>
  <div class="container-fluid">
    <h2 v-if="!isLoading" class="fw-bold">Биткоин и Эфириум</h2>
    <div class="row">
      <!-- Левая колонка для новостей (шире правой колонки) -->
      <div class="col-12 col-md-4 fixed-sidebar mb-4 mb-md-0" v-if="!isLoading">
        <div class="sidebar-content">
          <div v-for="(newsItem, index) in latestNews.slice(9)" :key="index" class="sidebar-news-item">
            <!-- <p>
              <img style="width: 35px; height: 35px;" :src="newsItem.source.uiTitle"> {{ newsItem.source.name }}
            </p> -->
            <a :href="newsItem.url" target="_blank" class="mt-auto">
              <h5 class="sidebar-news-title fw-bold">{{ newsItem.title }}</h5>
              <p class="card-text grey">{{ newsItem.content || 'Описание отсутствует' }}</p>
              <p class="card-text">{{ formatDate(newsItem.publishedAt) }}</p>
            </a> <p>
                  {{ newsItem.source.uiTitle }}<br/>
                  {{ newsItem.author }}
                  
                </p>
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categoryName }}</span>
                <hr/>
                <!-- <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
                <p class="card-text">{{ formatDate(newsItem.publishedAt) }}</p>
            <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categoryName }}</span> -->
          </div>
        
        </div>
      </div>

      <!-- Основная колонка с карточками новостей (две карточки в ряд) -->
      <div class="col-12 col-md-8" ref="newsContainer" v-if="!isLoading">
        <div class="row">
          <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-6 mb-4">
            <div class="car h-100 news-card" style="max-height: 500px;">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <!-- <p>
                  <img style="width: 35px; height: 35px;" :src="newsItem.source.uiTitle"> {{ newsItem.source.name }}
                </p> -->
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title fw-bold">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text ">
                  {{ formatDate(newsItem.publishedAt) }}
                 
                </p>
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categoryName }}</span>
                <div class="card-content-scroll">
                  <!-- <p class="card-text">
                    {{ truncateText(newsItem.description || 'Описание отсутствует', 150) }}
                  </p> -->
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
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.news = data.items.slice(0, 16); // Начинаем с 16-й новости
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
        this.latestNews = data.items.slice(16, 41); // Последующие новости для правой колонки
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
.grey{
  color: #6c757d;
}
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
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  
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
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 5px;
}

.car {
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-car:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.car-content-scroll {
  max-height: 100px;
  overflow-y: auto;
}

.car-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.car-text {
  font-size: 0.9rem;
  color: #6c757d;
}
.car{
  padding: 10px;
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
