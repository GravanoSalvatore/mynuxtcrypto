<template>
  <div class="news-section my-5">
    <!-- Баннер -->
    <div v-if="bannerItem" ref="banner" class="banner-container text-center py-4 mb-5">
      <div ref="bannerContent" class="banner-content">
        <NuxtLink to="/" class="navbar-brand">
          <img style="width: 250px;" src="../public/solana.png"/>
        </NuxtLink>
        <!-- <p ref="slogan" class="slogan fw-bold" style="font-size: 36px; color: #3d96ef;">Crypto bulls!</p> -->
      </div>
    </div>

    <!-- Карточки -->
    <div class="container">
      <!-- <h2 v-if="!isLoading" class="fw-bold">Defi & Nft</h2> -->
      <div class="row g-4" v-if="!isLoading">
        <div v-for="newsItem in displayedNewsItems" :key="newsItem.id" class="col-12 col-md-6 col-lg-3 news-card">
          <div class="car h-100">
            <img v-if="newsItem.imageurl" :src="newsItem.imageurl" class="card-img-top" alt="news image" />
            <div class="card-body d-flex flex-column">
              <p><img style="width: 35px; height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}</p>
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="card-title fw-bold">{{ newsItem.title }}</h5>
              </a>
              <p class="card-text ">{{ formatDate(newsItem.published_on) }}</p>
              <span style="font-size:10px; color:cornflowerblue;">
  {{ truncateCategory(newsItem.categories, 30) }}
</span>
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
      newsItems: [],
      bannerItem: null,
      displayedNewsItems: [], // Новости, которые будут отображаться
      initialDisplayCount: 16, // Начальное количество отображаемых новостей
      isLoading: true,
    };
  },
  async mounted() {
    await this.fetchNews();
    this.setupScrollAnimation();
    this.isLoading = false;
  },
  methods: {
    truncateCategory(text, maxLength) {
      // Если длина текста превышает maxLength, обрезаем и добавляем "..."
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }
  ,
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchNews() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=Technology,Blockchain&excludeCategories=Defi,Nft"
        );
        const data = await response.json();
        this.bannerItem = data.Data[0] || null;
        this.newsItems = data.Data.slice(1); // Остальные новости для карточек
        this.displayedNewsItems = this.newsItems.slice(0, this.initialDisplayCount); // Отображаем первые 12
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    },
    loadMore() {
      const nextItems = this.newsItems.slice(
        this.displayedNewsItems.length,
        this.displayedNewsItems.length + this.initialDisplayCount
      );
      this.displayedNewsItems = [...this.displayedNewsItems, ...nextItems];
    },
    showLess() {
      this.displayedNewsItems = this.newsItems.slice(0, this.initialDisplayCount);
      this.scrollToLoadMoreButton();
    },
    scrollToLoadMoreButton() {
      this.$refs.loadMoreButton.scrollIntoView({ behavior: "smooth" });
    },
    setupScrollAnimation() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.showBanner();
            } else {
              this.resetAnimation();
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(this.$refs.banner);
    },
    showBanner() {
      const bannerContent = this.$refs.bannerContent;
      const slogan = this.$refs.slogan;

      if (bannerContent) bannerContent.classList.add("fade-in");
      if (slogan) {
        slogan.classList.remove("slide-in");
        setTimeout(() => {
          slogan.classList.add("slide-in");
        }, 1000);
      }
    },
    resetAnimation() {
      const bannerContent = this.$refs.bannerContent;
      const slogan = this.$refs.slogan;

      if (bannerContent) bannerContent.classList.remove("fade-in");
      if (slogan) slogan.classList.remove("slide-in");
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
  
.pointer {
  cursor: pointer;
}
a {
  text-decoration: none;
  /* color: black; */
}
.fixed-sidebar {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}
.sidebar-crypto-item {
  margin-bottom: 10px;
  padding: 10px;
  /* background-color: #f8f9fa; */
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.crypto-icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.crypto-name {
  font-size: 0.9rem;
}
.text-success {
  color: #28a745;
}
.text-danger {
  color: #dc3545;
}
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}
.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
  
a{
  text-decoration: none;
  /* color: #040404; */
}
.container {
  max-width: 1200px;
}
.banner-container {
  height: 250px;
  background-color: rgba(12, 31, 74, 0.9);
  padding: 30px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-content {
  border-radius: 8px;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  position: relative;
}
.banner-content.fade-in {
  opacity: 1;
}
.slogan {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.slogan.slide-in {
  opacity: 1;
  transform: translateY(0);
}
.news-card {
  transition: transform 0.3s ease;
}
.news-card:hover {
  transform: scale(1.02);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
