
<template>
  <div class=" personalities ">
    <!-- <div v-if="isLoading" class="preloader text-white">
      <p>
        <img
          style="width: 300px;"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"
          alt="preloader"
        />
      </p>
    </div> -->

    <div  class="container">
   
    <div class="row" v-if="!selectedPerson">
      <div
        v-for="(person, index) in visiblePersonalities"
        :key="index"
        class="col-lg-2 col-md-6 col-12 mb-4"
      >
        <div class="personality-card text-center" @click="selectPerson(index)">
          <img 
        
         @load="checkImagesLoaded"
            v-if="person.image"
            :src="person.image"
            class="img-fluid personality-img"
            alt="person image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ person.firstName }} {{ person.lastName }}</h5>
          </div>
        </div>
      </div>
      <div class="col-12 text-center fw-bold">
        <span v-if="visiblePersonalitiesCount < newsStore.personalities.length" @click="loadMorePersonalities" class="pointer">Show more</span> 
        <span v-if="visiblePersonalitiesCount > 6" @click="hidePersonalities" class="pointer ml-2">| Hide</span>
        <br/><br/><br/>
      </div>
    </div>
    
    
    <div v-if="selectedPerson" class="selected-personality ">
      <div class="row">
        <!-- Левая колонка с новостями -->
        <div class="col-md-3 news-sidebar">
  <div v-for="(newsItem, index) in latestNews" :key="index" class="sidebar-news-item">
    <a :href="newsItem.url" target="_blank" class="d-flex align-items-center">
      <img
        v-if="newsItem.imageurl"
        :src="newsItem.imageurl"
        class="sidebar-image"
        alt="news image"
      />
      <div class="sidebar-text">
        <h6 class="news-title">{{ newsItem.title }}</h6>
        <p style="color:cornflowerblue" class="card-text ">
          {{ formatDate(newsItem.published_on) }}
        </p>
      </div>
    </a>
  </div>
</div>


        <!-- Основной контент выбранной персоны -->
        <div class="col-md-9 personality-content">
          <span @click="clearSelection" class="back-link">
            <!-- <i class="fa-solid fa-backward"></i>  -->
            Return to articles
          </span>
          <div class="personality-container">
            <img :src="selectedPerson.image" class="img-fluid personality-image rounded-4" alt="person image" />
            <div class="personality-text">
              <h2 class="fw-bold">{{ selectedPerson.firstName }} {{ selectedPerson.lastName }}</h2>
              <p>{{ selectedPerson.bio }}</p>
            </div>
          </div>



          <div class="news-slider" v-if="currentSlideArticles.length">
  <button @click="previousSlide" class="slider-button">←</button>
  <div class="news-cards">
    <div v-for="slide in currentSlideArticles" :key="slide.title" class="news-card">
      <img :src="slide.imageurl" class="img-fluid rounded-4" alt="news image" />
     
      <a :href="slide.url" target="_blank">
              <h6 class="news-title ">{{ slide.title }}</h6>
              <p style="color:cornflowerblue" class="card-text ">
                {{formatDate( slide.published_on) }}
                  </p>
            </a>
    </div>
  </div>
  <button @click="nextSlide" class="slider-button">→</button>
</div>
<div class="news-section-wrapper">
            <advanced-news-section-2 />
          </div>
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
    totalImages() {
      return this.visiblePersonalities.length; // Общее количество изображений для отображения
    },
    visiblePersonalities() {
      return this.newsStore.personalities.slice(0, this.visiblePersonalitiesCount);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustSidebarHeight);
  },
  data() {
    return {
      sliderIndex: 0,
      slideSize: 2,
      latestNews2: [],
      currentSlideArticles: [],
      visiblePersonalitiesCount: 12,
isLoading: true, 
loadedImagesCount: 0,
selectedPerson: null,
      latestNews: [],
    };
  },
  async mounted() {
   
    await this.fetchSliderNews();
    window.addEventListener('resize', this.adjustSidebarHeight);
    await this.fetchLatestNews();
  },
  methods: {
    
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
    updateCardWidth() {
    const slider = this.$el.querySelector('.news-slider');
    if (slider) {
      const cardWidth = slider.clientWidth / this.slideSize;
      this.$el.querySelectorAll('.news-card').forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    }
  },
    loadMorePersonalities() {
      this.visiblePersonalitiesCount += 12;
    },
    hidePersonalities() {
      this.visiblePersonalitiesCount = 12; // Скрывает все кроме первых 6
    },
    scrollToTop() {
  console.log("Scrolling to top...");
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
,
    async fetchLatestNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.latestNews = data.Data;
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
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
    selectPerson(index) {
      this.selectedPerson = this.newsStore.personalities[index];
      this.scrollToTop() ;
      
    },
    clearSelection() {
      this.selectedPerson = null;
    },
  },
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

  
  .car {
    padding: 10px;
  box-shadow: 0 8px 16px var(--box-shadow-color);
}

.car:hover {
  transition: transform 0.3s, box-shadow 0.3s;
  transform: scale(1.05);
  box-shadow: 0 8px 16px var(--box-shadow-color); /* Тень при наведении */
}
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #091520;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.sidebar-news-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.sidebar-image {
  width: 80px; /* Задайте желаемый размер для изображения */
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px; /* Добавляет скругление углов для изображения */
}

.sidebar-text {
  flex: 1;
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
.news-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  /* overflow: hidden; */
}

.slider-button {
  background-color: transparent  !important;
 
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

.news-card {
  flex: 1 0 calc(100% / 3); /* 3 элемента на слайд */
  box-sizing: border-box;
  padding: 10px;
  /* background-color: #091520; */
  border-radius: 10px;
  text-align: center;
}
.sidebar-news-item {
  margin-bottom: 15px;
}
.pointer{
  cursor: pointer;
}
a{
  text-decoration:none;
  /* color:white */
}
.personalities {
  margin-top: 20px;
  /* background-image: url('https://s40910.pcdn.co/wp-content/uploads/2022/03/TD0622-blockchain-thats-exciting-1778x1000.jpg.optimal.jpg'); */
  /* color: white; */
}
.personality-card {
  /* padding: 20px; */
  cursor: pointer;
  
}

.personality-img {
  min-width: 185px;
  min-height: 250px;
  object-fit: cover;
  border-radius: 10px;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 10px;
}
.selected-personality .row {
  display: flex;
}
.news-sidebar {
  max-height: 420vh;
  overflow-y: auto;
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
.personality-content {
  padding: 20px;
}
.personality-container {
 
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personality-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.personality-text {
  width: 100%;
  max-width: 800px;
}
.back-link {
  cursor: pointer;
  font-weight: bold;
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

@media (max-width: 768px) {
  .selected-personality .row {
    flex-direction: column-reverse;
  }
  .news-sidebar {
    max-height: auto;
    border-right: none;
    
    margin-bottom: 20px;
  }
  .personality-container {
    align-items: center;
  }
  .personality-image {
    max-width: 100%;
  }
  .personality-text {
    text-align: center;
  }
}
@media (max-width: 768px) {
  .news-card {
    flex: 1 0 100%; /* Показываем одну карточку на экранах мобильных устройств */
  }

  .slider-button {
    font-size: 18px;
    padding: 5px;
  }

  .news-title {
    font-size: 1rem;
  }

  .card-text {
    font-size: 0.8rem;
  }
}
</style>
