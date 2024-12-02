<template>
  <div class="news-section my-5">
    <!-- Баннер -->
    <div v-if="bannerItem" ref="banner" class="banner-container text-center py-4 mb-5">
      <div ref="bannerContent" class="banner-content">
        <!-- <NuxtLink to="/" class="navbar-brand"> -->
          <img style="width: 250px;" src="https://cdn.prod.website-files.com/62f387a85a056619ebadb8de/62ffa256a99af5585079805f_%D0%B7%D1%89%D0%B4%D0%B3%D0%BF%D1%89%D1%82.png"/>
        <!-- </NuxtLink> --><p class="fw-bold fs-2">MATIC</p>
      </div>
    </div>

    <!-- Карточки -->
    <div class="container">
      <h2 v-if="!isLoading" class="fw-bold">Новости</h2>
      <div class="row g-4" v-if="!isLoading">
        <div v-for="newsItem in displayedNewsItems" :key="newsItem.id" class="col-12 col-md-6 col-lg-3 news-card">
          <div class="car h-100">
            <img v-if="newsItem.urlToImage" :src="newsItem.urlToImage" class="card-img-top" alt="news image" />
            <div class="card-body d-flex flex-column">
              <p>
                 
                  {{ newsItem.author }}
                </p>
           
            
              <a :href="newsItem.url" target="_blank" class="mt-auto">
                <h5 class="card-title fw-bold">{{ newsItem.title }}</h5>
              </a>
              <p class="card-text ">{{ formatDate(newsItem.publishedAt) }}</p>
              <span style="font-size:10px; color:cornflowerblue;">
                {{ truncateCategory(newsItem.categoryName, 30) }}
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
      displayedNewsItems: [],
      initialDisplayCount: 16,
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
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    },
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
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        this.bannerItem = data.items[0] || null;
        this.newsItems = data.items.slice(1); 
        this.displayedNewsItems = this.newsItems.slice(0, this.initialDisplayCount); 
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
  --link-color: #000000;
  --text-color: #000000;
  --box-shadow-color: rgba(73, 69, 69, 0.3);
  background-color: #ffffff;
}

.dark-mode {
  --link-color: #ffffff;
  --text-color: #ffffff;
  --box-shadow-color: rgba(238, 235, 235, 0.3);
}

body, .dark-mode {
  color: var(--text-color);
}

a {
  color: var(--link-color);
  text-decoration: none;
}

.car {
  padding: 10px;
  box-shadow: 0 8px 16px var(--box-shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 20px var(--box-shadow-color);
}

.pointer {
  cursor: pointer;
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
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.banner-container {
  height: 330px;
  /* background-color: rgba(12, 31, 74, 0.9); */
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

.news-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
