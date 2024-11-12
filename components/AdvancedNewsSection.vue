 <template>
    <div class="container" v-if="!loading">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <!-- Карточки под большой карточкой -->
          <div
            style=""
            v-for="newsItem in sideNews"
            :key="newsItem.id"
            class="car mb-3 side-card flex-row align-items-center mx-auto"
          >
            <div class="card-body">
              <p class="text-success">
              <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img">  {{ newsItem.source_info.name }}
              </p>
              <a :href="newsItem.url" target="_blank" class="mt-auto fw-bold">{{ newsItem.title }}</a>
              <p class="card-text ">
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
          <div class="car mb-4 large-card position-relative mx-auto">
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
              <div class="h-100 small-car" style="">
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
                  <p class="card-text ">
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
      this.logCurrentThemeStyles();
      await this.fetchNews();
    },
    methods: {
      logCurrentThemeStyles() {
        const rootStyles = getComputedStyle(document.documentElement);
        console.log("Current link color:", rootStyles.getPropertyValue('--link-color'));
        console.log("Current text color:", rootStyles.getPropertyValue('--text-color'));
        console.log("Current box shadow color:", rootStyles.getPropertyValue('--box-shadow-color'));
    },
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
 :root {
  --link-color: #000000;
  --text-color: #000000;
  --box-shadow-color: rgba(73, 69, 69, 0.3); /* Тень для светлой темы */
  --card-background: #ffffff;
}

.dark-mode {
  --link-color: #ffffff;
  --text-color: #ffffff;
  --box-shadow-color: rgba(238, 235, 235, 0.5); /* Тень для тёмной темы */
  --card-background: #333333;
}

body, .dark-mode {
  color: var(--text-color);
}

/* Логирование: временные обводки и фон */
.car {
  padding: 10px;
  background-color: var(--card-background);
  box-shadow: 0 8px 16px var(--box-shadow-color), 0 0 0 3px red; /* временная красная обводка */
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 20px var(--box-shadow-color);
  outline-color: blue; /* Проверка при наведении */
}

a {
  color: var(--link-color);
  text-decoration: none;
}

a:hover {
 
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
   
  }
  
  .large-card {
    max-width: 600px;
    height: 400px;
    /* box-shadow: none !important; */
    border: none !important;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .large-card-img {
    /* box-shadow: none !important; */
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
    /* color: #f0f0f0; */
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
 
  </style>
  