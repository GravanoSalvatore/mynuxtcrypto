<!-- <template>
    <div class="container" v-if="!loading">
      <div class="row justify-content-center">
       
        <div class="col-12 col-lg-6">
         
          <div
          style="background-color: #f8f9fa !important;"
            v-for="newsItem in sideNews"
            :key="newsItem.id"
            class="card mb-3 side-card flex-row align-items-center mx-auto"
          >
            <div  class="card-body" >
              <p  class="text-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}</p>
              <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>

              <p class="card-text text-muted">
                {{ formatDate(newsItem.publishedAt) }}
              </p>
            </div>
            <img
              v-if="newsItem.urlToImage"
              :src="newsItem.urlToImage"
              class="img-fluid side-card-img"
              alt="news image"
            />
          </div>
          <div class="card mb-4 large-card position-relative mx-auto">
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
              </h5>
             
            </div>
          </div>
        </div>
    
        <div class="col-12 col-lg-6">
          <div class="row">
            <div
              v-for="newsItem in smallNews"
              :key="newsItem.id"
              class="col-6 mb-4"
            >
              <div class=" h-100 small-card" style="background-color: #f8f9fa;">
                <img
                  v-if="newsItem.urlToImage"
                  :src="newsItem.urlToImage"
                  class="card-img-top small-card-img"
                  alt="news image"
                />
                <div class="card-body">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {{ newsItem.author }}</p>
                  <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>

                  <p class="card-text text-muted">
                    {{ formatDate(newsItem.publishedAt) }}
                  </p>
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
        smallNews: [], // для маленьких карточек в левой колонке
        largeNewsItem: {}, // для большой карточки
        sideNews: [], // для карточек под большой карточкой
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
            "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=100"
          );
          const data = await response.json();
          
          // Заполняем массивы для отображения
          this.smallNews = data.items.slice(0, 10);
          this.largeNewsItem = data.items[4];
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
  /* Стили для маленьких карточек в левой колонке */
  .card-body {
    box-shadow: none !important;
    border: none !important;
  }
  
  .small-card:hover {
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    transform: scale(1.05); */
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
  
  /* Стили для большой карточки */
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
  
  /* Стили для боковых карточек под большой карточкой */
  .side-card {
    max-width: 600px;
    height: 250px;
    display: flex;
    box-shadow: none !important;
    border: none !important;
  }
  
  .side-card-img {
    width: 40%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Адаптивные стили */
  @media (max-width: 992px) {
    .large-card,
    .side-card {
      width: 100%;
    }
  }
  a{
    text-decoration:none;
    color: black;
  }
  </style>
   -->
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
  