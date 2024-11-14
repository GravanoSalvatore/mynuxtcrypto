<template>
  <div v-if="news" class="news-detail">
    <h1>{{ news.title }}</h1>
    <img :src="news.image" alt="news image" class="news-image" />
    <p>{{ news.content }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    console.log("Получен params:", params);

    // Подключение к API для получения данных статьи
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    );
    const newsItem = response.data.Data.find(
      (item) => item.id == params.id
    );

    return { news: newsItem || null };
  },
};
</script>

<style scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
.news-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}
.news-detail h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.news-detail p {
  font-size: 1rem;
  color: #666;
}
</style>
