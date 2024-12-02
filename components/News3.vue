

<template>
  <div class="banner-container" v-if="currentBanners.length">
    <div
      v-for="(banner, index) in currentBanners"
      :key="index"
      class="banner"
      :style="{ backgroundImage: `url(${banner.urlToImage})` }"
    >
      <div class="banner-content">
        <h1 class="banner-title" :class="{ fadeIn: showTitle }">{{ banner.title }}</h1>
        <p v-if="banner.publishedAt" class="banner-date" :class="{ fadeIn: showTitle }">
          {{ formatDate(banner.publishedAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      banners: [],
      bannerIndex: 0,
      currentBanners: [],
      showTitle: false,
    };
  },
  async mounted() {
    this.$emit('loaded');
    await this.fetchBannerData();
    if (this.banners.length > 0) {
      this.updateCurrentBanners();
      this.startBannerRotation();
    }
  },
  methods: {
    async fetchBannerData() {
      try {
        const response = await fetch(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100"
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          this.banners = data.items; // выбираем первые 6 новостей для баннеров
          this.updateCurrentBanners();
          this.fadeInTitle();
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных баннера:", error);
      }
    },
    startBannerRotation() {
      setInterval(() => {
        if (this.banners.length > 0) {
          this.bannerIndex = (this.bannerIndex + 3) % this.banners.length;
          this.updateCurrentBanners();
          this.fadeInTitle();
        }
      }, 10000);
    },
    updateCurrentBanners() {
      this.currentBanners = this.banners.slice(this.bannerIndex, this.bannerIndex + 3);
    },
    fadeInTitle() {
      this.showTitle = false;
      setTimeout(() => {
        this.showTitle = true;
      }, 500);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.banner-container {
  display: flex;
  gap: 10px;
  flex-direction: row;
}

.banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.5);
  flex: 1;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  border-radius: 10px;
}

.banner-title {
  font-size: 2rem;
  margin: 0;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.banner-date {
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  margin-top: 10px;
}

.fadeIn {
  opacity: 1;
}

@media (max-width: 768px) {
  .banner-container {
    flex-direction: column;
  }
  .banner {
    width: 100%;
    height: 300px;
  }
  .banner-title {
    font-size: 1.5rem;
  }
  .banner-date {
    font-size: 1rem;
  }
}
</style>
