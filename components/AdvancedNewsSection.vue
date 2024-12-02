<template>
  <div class="container" v-if="!loading">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <!-- Карточки под большой карточкой -->
        <div
          v-for="newsItem in sideNews"
          :key="newsItem.id"
          class="car mb-3 side-card flex-row align-items-center mx-auto"
        >
          <div class="card-body">
            <p class="text-success">
              {{ newsItem.source.uiTitle }}<br/>
              {{ newsItem.author }}
            </p>
            <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
            <p class="card-text">{{ formatDate(newsItem.publishedAt) }}</p>
          </div>
          <img
            v-if="newsItem.urlToImage"
            :src="newsItem.urlToImage"
            class="img-fluid side-card-img"
            alt="news image"
          />
        </div>

        <!-- Большая карточка -->
        <div class="car mb-4 large-card position-relative mx-auto">
          <img
            v-if="largeNewsItem.urlToImage"
            :src="largeNewsItem.urlToImage"
            class="card-img large-card-img"
            alt="news image"
          />
          <div class="card-img-overlay d-flex align-items-center justify-content-center large-overlay">
            <h5 class="card-title text-white large-title text-center">
              <a :href="largeNewsItem.url" target="_blank" class="text-white">
                {{ largeNewsItem.title }}
              </a>
              <p style="font-size: 14px;">
                  {{ largeNewsItem.source.uiTitle }}<br/>
                  {{ largeNewsItem.author }}<br/>
                  {{ formatDate(largeNewsItem.publishedAt) }}
                </p>
            </h5>
            
            <div class="card-body">
                
              
              
              </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка с сеткой маленьких карточек -->
      <div class="col-12 col-lg-6">
        <div class="row">
          <div
            v-for="newsItem in smallNews"
            :key="newsItem.id"
            class="col-6 mb-4"
          >
            <div class="h-100 small-car">
              <img
                v-if="newsItem.urlToImage"
                :src="newsItem.urlToImage"
                class="card-img-top small-card-img"
                alt="news image"
              />
              <div class="card-body">
                <p>
                  {{ newsItem.source.uiTitle }}<br/>
                  {{ newsItem.author }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
                <p class="card-text">{{ formatDate(newsItem.publishedAt) }}</p>
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
      loading: true,
      smallNews: [],
      largeNewsItem: {},
      sideNews: [],
    };
  },
  async mounted() {
    await this.fetchNews();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();

        // Обновление данных для отображения
        this.smallNews = data.items.slice(0, 8);
        this.largeNewsItem = data.items[1];
        this.sideNews = data.items.slice(11, 15);
        this.loading = false;
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
  },
};
</script>

<style scoped>
:root {
  --link-color: #000000;
  --text-color: #000000;
  --box-shadow-color: rgba(73, 69, 69, 0.3);
  --card-background: #ffffff;
}

.dark-mode {
  --link-color: #ffffff;
  --text-color: #ffffff;
  --box-shadow-color: rgba(238, 235, 235, 0.5);
  --card-background: #333333;
}

body, .dark-mode {
  color: var(--text-color);
}

.car {
  padding: 10px;
  background-color: var(--card-background);
  box-shadow: 0 8px 16px var(--box-shadow-color);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.car:hover {
  transform: scale(1.05);
}

a {
  color: var(--link-color);
  text-decoration: none;
}

.small-card-img {
  height: 150px;
  object-fit: cover;
}

.large-card {
  max-width: 600px;
  height: 400px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.large-card-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.large-overlay {
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.large-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

.side-card {
  max-width: 600px;
  height: 250px;
  display: flex;
}

.side-card-img {
  width: 40%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 992px) {
  .large-card,
  .side-card {
    width: 100%;
  }
}
</style>
