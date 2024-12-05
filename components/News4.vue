<template>
  <div class="container-fluid">
   
    <div class="row">
      <!-- Sidebar с криптовалютами -->
     

      <!-- Основная колонка с карточками новостей -->
      <div class="col-12 col-md-9" ref="newsContainer">
        <div class="row">
          <div
            v-for="newsItem in paginatedNews"
            :key="newsItem.id"
            class="col-12 col-md-6 col-lg-4 mb-4"
          >
            <div class="car h-100 news-card" style="max-height: 500px;">
              <img
                v-if="newsItem.imageurl"
                :src="newsItem.imageurl"
                class="card-img-top"
                alt="news image"
                style="height: 200px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <p>
                  <img style="width: 35px; height: 35px;" :src="newsItem.source_info.img" />
                  {{ newsItem.source_info.name }}
                </p>
                <a :href="newsItem.url" target="_blank" class="mt-auto">
                  <h5 class="card-title">{{ newsItem.title }}</h5>
                </a>
                <p class="card-text ">{{ formatDate(newsItem.published_on) }}</p>
                <span style="font-size: 10px; color: cornflowerblue">
                  {{ truncateCategory(newsItem.categories) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <div v-if="!isLoading" class="d-flex justify-content-center">
          <span class="pointer mx-2" :disabled="currentPage === 1" @click="prevPage">
            <i class="bi bi-arrow-left-square"></i>
          </span>
          <span class="pointer mx-2" :disabled="currentPage === totalPages" @click="nextPage">
            <i class="bi bi-arrow-right-square"></i>
          </span>
        </div>
      </div>
      <div 
     
     class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
    
       <div   style=" box-shadow: 0 8px 16px black;border-radius: 5px;"  class="sidebar-content p-1">
         <input
         v-if="!isLoading"
         style="font-size: 12px; color:cornflowerblue ;box-shadow: none !important; border: none !important;background-color: transparent !important"
         type="text"
         v-model="searchQuery"
         placeholder="Search"
         class="form-control mb-3 mt-4 "
       />
       <div style="padding-left: 20px" class="button-group">
       <button class="btn btn-success btn-sm me-1" @click="sortByChangeDesc">
              <i class="fas fa-arrow-up"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="sortByChangeAsc">
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>
         <div
       
           v-for="crypto in displayedCryptos"
           :key="crypto.id"
           class="sidebar-crypto-item mt-2"
         >
           <div class="sidebar-crypto-card d-flex align-items-center">
             <div class="crypto-info ms-2">
               <h6 style="font-size: 12px;" class="crypto-name">
                 <img :src="crypto.image" class="crypto-icon" alt="crypto icon" />
                 {{ crypto.name }}: {{ crypto.current_price.toFixed(2) }} USD
                 <br/>
                 <div style="padding-left: 40px;">
                 <span
                   :class="{
                     'text-success': crypto.price_change_percentage_24h >= 0,
                     'text-danger': crypto.price_change_percentage_24h < 0
                   }"
                 >
                   <i
                     :class="{
                       'fas fa-arrow-up': crypto.price_change_percentage_24h >= 0,
                       'fas fa-arrow-down': crypto.price_change_percentage_24h < 0
                     }"
                   ></i>
                   {{ crypto.price_change_percentage_24h.toFixed(2) }}%
                 </span></div>
               </h6>
             </div>
           </div>
         </div>
         <div
           v-if="!isLoading && !showAllCryptos"
           @click="showAllCryptos = true"
           class="pointer text-center fw-bold"
          
         >
           Open
       </div>
         <div
           v-if="!isLoading && showAllCryptos"
           @click="showAllCryptos = false"
           class="pointer  fw-bold text-center"
         >
           Close
           <br/><br/>
         </div>
         <br/><br/>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      latestNews: [],
      topCryptos: [],
      currentPage: 1,
      pageSize: 9,
      isLoading: true,
      searchQuery: "",
      showAllCryptos: false, // Управление отображением всех криптовалют
    };
  },
  computed: {
    filteredCryptos() {
      return this.topCryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    displayedCryptos() {
      return this.showAllCryptos ? this.filteredCryptos : this.filteredCryptos.slice(0, 8);
    },
    totalPages() {
      return Math.ceil(this.news.length / this.pageSize);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.news.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    truncateCategory(category) {
      return category.length > 20 ? category.slice(0, 40) + "..." : category;
    },
    async fetchData() {
      try {
        await this.fetchNews();
        await this.fetchTopCryptos();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    async fetchNews() {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
    );
    const data = await response.json();
    this.news = Array.isArray(data.Data) ? data.Data : []; // Проверка на массив
    this.latestNews = Array.isArray(data.Data) ? data.Data : [];
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error);
    this.news = []; // В случае ошибки инициализируем как пустой массив
    this.latestNews = [];
  }
}
,
    // async fetchNews() {
    //   const response = await fetch(
    //     "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
    //   );
    //   const data = await response.json();
    //   this.news = data.Data;
    //   this.latestNews = data.Data;
    // },
    async fetchTopCryptos() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
        );
        const data = await response.json();
        this.topCryptos = data;
      } catch (error) {
        console.error("Ошибка загрузки криптовалют:", error);
      }
    },
    sortByChangeDesc() {
      this.topCryptos.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    },
    sortByChangeAsc() {
      this.topCryptos.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      this.scrollToTop();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
      this.scrollToTop();
    },
    scrollToTop() {
      this.$refs.newsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  },
};
</script>

<style scoped>
.sidebar-content .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #28a745;
  color: white;
}

.btn-danger:hover {
  background-color: #dc3545;
  color: white;
}

::placeholder{
  color:  cornflowerblue;
}
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
  box-shadow: 0 8px 16px var(--box-shadow-color); 
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
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.card-text {
  font-size: 0.9rem;
  /* color: #6c757d; */
}
@media (max-width: 767px) {
  .fixed-sidebar {
    max-height: auto;
    position: static;
  }
}
</style>
