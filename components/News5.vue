
<template>
  <div class="container-fluid">
    <div class="row">
      
      <!-- Основная колонка с карточками новостей (четыре карточки в ряд) -->
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-6 col-lg-3 mb-4"
          >
            <div class=" h-100 news-card" style="max-height: 500px">
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
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация, отображается только после полной загрузки -->
        <!-- <div v-if="!isLoading" class="d-flex justify-content-center mt-4">
          <span
            class="pointer mx-2"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Назад
          </span>
          <span
            class="pointer mx-2"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Вперед
          </span>
        </div> -->
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
            <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
  
</template>

<script>
export default {
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

        // Отбираем новости с 16-й позиции до нужного количества для основной колонки
        this.news = data.Data.slice(15, 23); // Основная колонка (16-я новость и далее)

        // Остальные новости для правой колонки (начиная с 55-й новости)
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

/* .news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
} */

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
