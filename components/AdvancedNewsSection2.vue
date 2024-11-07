<template>
    <div class="container" v-if="!loading">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <!-- Карточки под большой карточкой -->
          <div
            style=""
            v-for="newsItem in sideNews"
            :key="newsItem.id"
            class="card mb-3 side-card flex-row align-items-center mx-auto"
          >
            <div class="card-body">
              <p class="text-success">
              <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img">  {{ newsItem.source_info.name }}
              </p>
              <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
              <p class="card-text text-muted">
                {{ formatDate(newsItem.published_on) }}
              </p>
              <!-- <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span> -->
            </div>
            <img
              v-if="newsItem.imageurl"
              :src="newsItem.imageurl"
              class="img-fluid side-card-img"
              alt="news image"
            />
          </div>
          
          <!-- Большая карточка -->
          <div class="card mb-4 large-card position-relative mx-auto">
            <img
              v-if="largeNewsItem.imageurl"
              :src="largeNewsItem.imageurl"
              class="card-img large-card-img"
              alt="news image"
            />
            <div class="card-img-overlay d-flex align-items-center justify-content-center large-overlay">
              <h5 class="card-title text-white large-title text-center">
                <a :href="largeNewsItem.url" target="_blank" class="text-white">
                  {{ largeNewsItem.title }}
                </a>
              </h5>
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
              <div class="h-100 small-card" style="background-color: #f8f9fa;">
                <img
                  v-if="newsItem.imageurl"
                  :src="newsItem.imageurl"
                  class="card-img-top small-card-img"
                  alt="news image"
                />
                <div class="card-body">
                  <p>
                    <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img">  {{ newsItem.source_info.name }}
                  </p>
                  <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
                  <p class="card-text text-muted">
                    {{ formatDate(newsItem.published_on) }}
                  </p>
                  <!-- <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span> -->
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
        smallNews: [], // для маленьких карточек в правой колонке
        largeNewsItem: {}, // для большой карточки
        sideNews: [], // для карточек под большой карточкой
      };
    },
    async mounted() {
      await this.fetchNews();
    },
    methods: {
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Преобразование Unix timestamp в миллисекунды
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      async fetchNews() {
        try {
          const response = await fetch(
            "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
          );
          const data = await response.json();
          
          // Заполняем массивы для отображения
          this.smallNews = data.Data.slice(0, 8);
          this.largeNewsItem = data.Data[1];
          this.sideNews = data.Data.slice(11, 15);
          this.loading = false;
        } catch (error) {
          console.error("Ошибка при загрузке новостей:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card-body {
    box-shadow: none !important;
    border: none !important;
  }
  .card {
    /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); */
}

.card:hover {
  transition: transform 0.3s, box-shadow 0.3s;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
  .card {

  }
  
  .small-card-img {
    box-shadow: none !important;
    border: none !important;
    height: 150px;
    object-fit: cover;
  }
  
  .small-title {
    font-size: 1rem;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
  
  .large-card {
    max-width: 600px;
    height: 400px;
    box-shadow: none !important;
    border: none !important;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .large-card-img {
    box-shadow: none !important;
    border: none !important;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  
  .large-overlay {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
  
  .large-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }
  
  .small-text {
    font-size: 0.9rem;
    color: #f0f0f0;
  }
  
  .side-card {
    max-width: 600px;
    height: 250px;
    display: flex;
    /* box-shadow: none !important;
    border: none !important; */
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
  a {
    text-decoration: none;
    color: black;
  }
  </style>
  