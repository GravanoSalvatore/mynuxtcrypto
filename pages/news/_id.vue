<template>
  <div v-if="isLoading" class="preloader text-white">
    <p>Загрузка новости...</p>
  </div>
  <div v-else class="news-detail-container">
    <h1>{{ news.title }}</h1>
    <p class="news-date">{{ formatDate(news.published_on) }}</p>
    <img v-if="news.imageurl" :src="news.imageurl" alt="News image" class="news-image" />
    <p class="news-body">{{ news.body || "Описание отсутствует" }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: {},
      isLoading: true,
    };
  },
  async asyncData({ params, $axios }) {
    const newsId = params.id;
    try {
      const response = await $axios.$get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
      const newsItem = response.Data.find((item) => item.id == newsId);
      return { news: newsItem || {} };
    } catch (error) {
      console.error("Ошибка при загрузке новости:", error);
      return { news: {} };
    }
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.news-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.news-date {
  color: #888;
  font-size: 0.9rem;
}
.news-image {
  width: 100%;
  height: auto;
  margin: 20px 0;
}
.news-body {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
