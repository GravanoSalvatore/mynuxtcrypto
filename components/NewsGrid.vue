<template>
    <div class="news-grid">
      <div v-for="(news, index) in newsList" :key="index" class="news-card">
        <img :src="news.image" alt="news image" class="news-image" />
        <h3>
          <NuxtLink :to="{ name: 'news-id', params: { id: news.id } }">
            {{ news.title }}
          </NuxtLink>
        </h3>
        <p>{{ news.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newsList: [
          { id: 1, title: "News Title 1", image: "https://via.placeholder.com/150", content: "Content 1" },
          { id: 2, title: "News Title 2", image: "https://via.placeholder.com/150", content: "Content 2" },
          { id: 3, title: "News Title 3", image: "https://via.placeholder.com/150", content: "Content 3" },
          { id: 4, title: "News Title 4", image: "https://via.placeholder.com/150", content: "Content 4" },
          { id: 5, title: "News Title 5", image: "https://via.placeholder.com/150", content: "Content 5" },
          { id: 6, title: "News Title 6", image: "https://via.placeholder.com/150", content: "Content 6" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .news-card {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .news-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .news-card h3 {
    font-size: 1.2rem;
    margin-top: 10px;
  }
  .news-card p {
    font-size: 0.9rem;
    color: #666;
  }
  </style>
  