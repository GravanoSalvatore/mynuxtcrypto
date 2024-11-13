
<template>
  <div class="container articles">
   
    <div style="" class="row" v-if="!selectedArticle">
      <div
        v-for="(article, index) in visibleArticles"
        :key="index"
        class="col-lg-3 col-md-6 col-12 mb-4"
      >
        <div
          style="background-color:"
          class="article-card text-center"
          @click="selectArticle(index)"
        >
          <NuxtImg 
            format="webp"
            :src="article.image"
            class="img-fluid article-img"
            alt="article image"
          />
          <div class="text">
            <h5 class="card-title fw-bold">{{ article.title }}</h5>
          </div>
        </div>
      </div>
      <div class="col-12 text-center fw-bold">
        <span
          v-if="visibleArticlesCount < newsStore.articles.length"
          @click="loadMoreArticles"
          class="pointer"
          >Show more
        </span>
        <span
          v-if="visibleArticlesCount > 8"
          @click="hideArticles"
          class="pointer ml-2"
          >| Hide</span
        >
        <br />
        <br />
        <br />
      </div>
    </div>

    <div v-if="selectedArticle" class="selected-article">
      <div class="row">
        <!-- Левая колонка с новостями -->
        <div class="col-md-3 news-sidebar" style="background-color:">
          <div
            v-for="(newsItem, index) in latestNews"
            :key="index"
            class="sidebar-news-item"
          >
            <p>
              <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img" />
              {{ newsItem.source_info.name }}
            </p>
            <a :href="newsItem.url" target="_blank">
              <h6 class="news-title ">{{ newsItem.title }}</h6>
            </a>
        <span style="color:cornflowerblue" >   {{ formatDate(newsItem.published_on) }}</span>
          </div>
        </div>

        <!-- Основной контент выбранной статьи -->
        <div class="col-md-9 article-content">
          <span @click="clearSelection" class="back-link">
            Return to articles
          </span>
          <div class="article-container">
            <img
              :src="selectedArticle.image"
              class="img-fluid article-image"
              alt="article image"
            />
            <div class="article-text">
              <h2 class="fw-bold">{{ selectedArticle.title }}</h2>
              <p>{{ selectedArticle.content }}</p>
              <p>{{ selectedArticle.content2 }}</p>
              <p>{{ selectedArticle.content3 }}</p>
              <p>{{ selectedArticle.content4 }}</p>
              <p>{{ selectedArticle.content5 }}</p>
              <p>{{ selectedArticle.content6 }}</p>
              <p>{{ selectedArticle.content7 }}</p>
              <p>{{ selectedArticle.content8 }}</p>
              <p>{{ selectedArticle.content9 }}</p>
              <p>{{ selectedArticle.content10 }}</p>
              <p>{{ selectedArticle.content11}}</p>
              <p>{{ selectedArticle.content12 }}</p>
              <p>{{ selectedArticle.content13 }}</p>
              <p>{{ selectedArticle.content14 }}</p>
              <p>{{ selectedArticle.content15 }}</p>
              <p>{{ selectedArticle.content16 }}</p>
              <p>{{ selectedArticle.content17 }}</p>
              <p>{{ selectedArticle.content18 }}</p>
              <p>{{ selectedArticle.content19 }}</p>
              <p>{{ selectedArticle.content20 }}</p>
              <p>{{ selectedArticle.content21}}</p>
              <p>{{ selectedArticle.content22 }}</p>
            </div>
          </div>

          <!-- Слайдер новостей -->
          <div class="news-slider" v-if="currentSlideArticles.length">
            <button @click="previousSlide" class="slider-button">←</button>
            <div class="news-cards">
              <div
                v-for="slide in currentSlideArticles"
                :key="slide.title"
                class="news-card"
              >
                <img :src="slide.imageurl" class="img-fluid rounded-4" alt="news image" />
                <h5 class="fw-bold">{{ slide.title }}</h5>
                <a :href="slide.url" target="_blank">
                  <!-- <h6 class="news-title ">{{ slide.title }}</h6> -->
                  <p class="card-text ">
                    {{ formatDate(slide.published_on) }}
                  </p>
                </a>
              </div>
            </div>
            <button @click="nextSlide" class="slider-button">→</button>
          </div>

          <!-- Компонент AdvancedNewsSection2 сразу под слайдером -->
          <div class="news-section-wrapper">
            <advanced-news-section-2 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AdvancedNewsSection2 from '~/components/AdvancedNewsSection2.vue';
import { useNewsStore } from './stores/newsStore';

export default {
  components:{AdvancedNewsSection2},
  setup() {
    const newsStore = useNewsStore();

    

    return {
      newsStore,
    };
  },
  computed: {
    visibleArticles() {
      return this.newsStore.articles.slice(0, this.visibleArticlesCount);
    },
  },
  data() {
    return {
      sliderIndex: 0,
      slideSize: 2,
   
visibleArticlesCount: 8,
      selectedArticle: null,
      latestNews: [],
      latestNews2: [],
      currentSlideArticles: [],
    };
  },
  beforeDestroy() {
  window.removeEventListener('resize', this.updateCardWidth);
  window.removeEventListener('resize', this.adjustSidebarHeight);
},
async mounted() {
  this.updateCardWidth();
  try {
    await this.fetchLatestNews();
    await this.fetchSliderNews();
  } catch (error) {
    console.error("Ошибка при инициализации данных:", error);
  }
  window.addEventListener('resize', this.adjustSidebarHeight);
},

  
  
  
  methods: {
  
  updateCardWidth() {
  this.$nextTick(() => {
    const slider = this.$el.querySelector('.news-slider');
    if (slider) {
      const cardWidth = slider.clientWidth / this.slideSize;
      this.$el.querySelectorAll('.news-card').forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }
  });
}
,
    loadMoreArticles() {
      this.visibleArticlesCount += 8;
    },
    hideArticles() {
      if (this.visibleArticlesCount > 8) {
        this.visibleArticlesCount -= 8;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    async fetchLatestNews() {
      try {
        const response = await fetch(
           "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.latestNews = data.Data.slice(30);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    async fetchSliderNews() {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?categories=Technology,Blockchain&excludeCategories=Defi,Nft"
    );
    const data = await response.json();
    this.latestNews2 = data.Data || []; // Убедитесь, что массив определен
    this.updateCurrentSlideArticles();
  } catch (error) {
    console.error("Ошибка при загрузке слайдера:", error);
  }
},
updateCurrentSlideArticles() {
  if (this.latestNews2.length > 0) {
    const startIndex = this.sliderIndex * this.slideSize;
    this.currentSlideArticles = this.latestNews2.slice(
      startIndex,
      startIndex + this.slideSize
    );
  } else {
    this.currentSlideArticles = [];
  }
}
,
updateCurrent(startIndex) {
    const container = this.$el.querySelector('.news-cards');
    const slider = this.$el.querySelector('.news-slider');

    if (container && slider) {
      const sliderWidth = slider.clientWidth; // ширина видимого контейнера
      const cardWidth = sliderWidth / 3; // динамически рассчитываем ширину одной новости (3 новости на экран)

      container.style.transform = `translateX(-${startIndex * cardWidth}px)`;
      container.style.transition = 'transform 0.5s ease-in-out'; // добавляем плавность
    }
  },
    
    nextSlide() {
    if (
      this.latestNews2 &&
      (this.sliderIndex + 1) * this.slideSize < this.latestNews2.length
    ) {
      this.sliderIndex++;
      this.updateCurrentSlideArticles();
    }
  },
  previousSlide() {
    if (this.sliderIndex > 0) {
      this.sliderIndex--;
      this.updateCurrentSlideArticles();
    }
  },
  formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Умножаем на 1000 для преобразования секунд в миллисекунды
  return date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
},
    selectArticle(index) {
      this.selectedArticle = this.newsStore.articles[index];
      this.scrollToTop();
    },
    
    clearSelection() {
      this.selectedArticle = null;
    }
  }
};
</script>

<style scoped>
:root {
  --link-color: #000000; /* Цвет ссылок в светлой теме */
  --text-color: #000000; /* Основной цвет текста в светлой теме */
  --box-shadow-color: rgba(73, 69, 69, 0.3); /* Тень для светлой темы */
  background-color: #ffffff;
}

.dark-mode {
  --link-color: #ffffff; /* Цвет ссылок в тёмной теме */
  --text-color: #ffffff; /* Основной цвет текста в тёмной теме */
  --box-shadow-color: rgba(238, 235, 235, 0.3); /* Светлая тень для тёмной темы */
  /* background-color: #8a0d0d; */
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

/* Стили для тени карточек */
.car {
  padding: 10px;
  box-shadow: 0 8px 16px var(--box-shadow-color); /* Тень для карточек */
  transition: transform 0.3s, box-shadow 0.3s;
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 20px var(--box-shadow-color); /* Более яркая тень при наведении */
}

  /* .card-body {
    box-shadow: none !important;
    border: none !important;
  } */
  .car {
    padding: 10px;
  box-shadow: 0 8px 16px var(--box-shadow-color);
}

.car:hover {
  transition: transform 0.3s, box-shadow 0.3s;
  transform: scale(1.05);
  box-shadow: 0 8px 16px var(--box-shadow-color); /* Тень при наведении */
}
.news-section-wrapper {
  width: 100%;
  margin-top: 20px;
}

.news-slider,
.news-section-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-cards {
  display: flex;
  gap: 20px;
  width: 100%;
  transition: transform 0.5s ease-in-out;
}

.news-card {
  flex: 1;
  text-align: center;
}

.news-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  overflow: hidden;
}

.slider-button {
  background-color:transparent !important; 
  color:cornflowerblue;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.news-cards {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
}

/* .news-card {
  flex: 1 0 calc(100% / 3); 
  box-sizing: border-box;
  padding: 10px;
  background-color: #091520;
  border-radius: 10px;
  text-align: center;
} */
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
}

.fixed {
  position: fixed;
}
.articles {
  /* background-color: #091520; */
  margin-top: 20px;
}
.article-card {
  cursor: pointer;
}
.article-img {
  border-radius:10px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.selected-article .row {
  display: flex;
  /* align-items: stretch; */
}

.news-sidebar {
  /* overflow-y: auto; */
  /* background-color: #f8f9fa; */
  padding: 10px;
  border-right: 1px solid cornflowerblue;
}
.sidebar-news-item {
  margin-bottom: 15px;
}
.news-title {
  font-size: 1rem;
  font-weight: bold;
  
}
.news-date {
  font-size: 0.8rem;
  color: #6c757d;
}

.article-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.article-text {
  /* background-color: #091520; */
  width: 100%;
  max-width: 800px;
}
.back-link {
  cursor: pointer;
  font-weight: bold;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .selected-article .row {
    flex-direction: column-reverse; /* Сначала основной контент статьи, затем новости */
  }
  .news-sidebar {
    max-height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .article-container {
    align-items: center;
  }
  .article-image {
    max-width: 100%;
  }
  .article-text {
    text-align: center;
  }
}
@media (max-width: 768px) {
  .news-card {
    flex: 1 0 100%; /* Показать по одному элементу на слайд на маленьких экранах */
  }

  .article-img {
    height: auto; /* Автоматическая высота для изображений на мобильных устройствах */
  }

  .article-container {
    padding: 15px;
  }

  .article-text {
    padding: 15px;
  }

  .news-slider {
    flex-direction: column; /* Слайдер на маленьких экранах выстраивается вертикально */
  }

  .slider-button {
    margin: 10px 0;
    font-size: 18px; /* Уменьшаем размер кнопок для мобильных устройств */
  }
}

</style>
