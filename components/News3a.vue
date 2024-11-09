<template>
  <div class="news-section my-5">
    <!-- Баннер -->
    <div v-if="bannerItem" ref="banner" class="banner-container text-center py-4 mb-5">
      <div ref="bannerContent" class="banner-content">
        <NuxtLink to="/" class="navbar-brand">
          <img style="width: 130px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png">
        </NuxtLink>
        <p ref="slogan" class="slogan fw-bold" style="font-size: 36px; color: #3d96ef;">Crypto bulls!</p>
      </div>
    </div>

    <!-- Карточки -->
    <div class="container">
      <h2 v-if="!isLoading" class="fw-bold">Defi & Nft</h2>
      <div class="row g-4" v-if="!isLoading">
        <div v-for="newsItem in displayedNewsItems" :key="newsItem.id" class="col-12 col-md-6 col-lg-3 news-card">
          <div class="card h-100">
            <img v-if="newsItem.imageurl" :src="newsItem.imageurl" class="card-img-top" alt="news image" />
            <div class="card-body d-flex flex-column">
              <p><img style="width: 35px; height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}</p>
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="card-title fw-bold">{{ newsItem.title }}</h5>
              </a>
              <p class="card-text text-muted">{{ formatDate(newsItem.published_on) }}</p>
              <span style="font-size:10px;color:cornflowerblue;">
                  {{ truncateCategory(newsItem.categories) }}
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
    truncateCategory(category) {
      return category.length > 20 ? category.slice(0, 50) + "..." : category;
    },
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
a{
  text-decoration: none;
  color: #040404;
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
