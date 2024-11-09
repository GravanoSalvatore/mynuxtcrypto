<template>
 
  <div class="">
    <br/><br/>
    <div
    class="banner mt-2"
  
    style=" backgroundImage:url('https://emarsys.com/app/uploads/2020/03/real-ai.jpg')"
  >
    <div class="banner-content">
      <h2 
    v-if="!isLoading" 
    class="heading-left  fw-bold">Artificial intelligence</h2>
      <!-- <p v-if="bannerData.publishedAt" class="banner-date" :class="{ fadeIn: showTitle }">
        {{ formatDate(bannerData.publishedAt) }}
      </p> -->
    </div>
  </div>
  <div class="container-fluid">
    <h2 v-if="!isLoading" class="heading-left  fw-bold">SEC</h2>
    <div class="row">
      <!-- Левая колонка для новостей (шире правой колонки) -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        
        <div class="sidebar-content">
          <div v-for="(newsItem, index) in latestNews" :key="index" class="sidebar-news-item">
            <div class="sidebar-news-card">
              <img
                v-if="newsItem.imageurl"
                :src="newsItem.imageurl"
                class="sidebar-news-img"
                alt="news image"
              />
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="sidebar-news-title">{{ newsItem.title }}</h5>
                <p class="card-text text-muted">
                  {{ formatDate(newsItem.published_on) }}
                </p>
                <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
                <p class="card-text">{{newsItem.body || 'Описание отсутствует' }}</p>
              </a>
              <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
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
                  <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text text-muted">
                  {{ formatDate(newsItem.published_on) }}
                </p>
                
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
.banner {
  background-image: url('https://emarsys.com/app/uploads/2020/03/real-ai.jpg');
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
}

.banner-title {
  font-size: 2rem;
  margin: 0;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.banner-date {
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  margin-top: 10px;
}

.fadeIn {
  opacity: 1;
}
.heading-left {
  margin-left: 10px; /* Регулируйте значение, чтобы достичь желаемого эффекта */
  text-align: left;
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
