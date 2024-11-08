


   
   <template>
    <div class="container-fluid">
      <div class="row">
        <!-- Left Column for Top 100 Cryptocurrencies with Search -->
        <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
          <input
            v-if="!isLoading"
            style="box-shadow: none !important;"
            type="text"
            v-model="searchQuery"
            placeholder="Search Cryptocurrency"
            class="form-control mb-3 mt-4"
          />
          <div class="sidebar-content">
            <div
              v-for="crypto in filteredCryptos"
              :key="crypto.id"
              class="sidebar-crypto-item"
            >
              <div class="sidebar-crypto-card d-flex align-items-center">

                <div class="crypto-info ms-2" style="">

                  <h6 style="font-size: 12px;" class="crypto-name">                  
                    <img :src="crypto.image" class="crypto-icon" alt="crypto icon" />
                    {{ crypto.name }}: {{ crypto.current_price.toFixed(2) }} USD  
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
                    </span></h6>
                  <!-- <p class="crypto-price">Price: {{ crypto.current_price.toFixed(2) }} USD</p> -->
                  <!-- <p class="crypto-market-cap">Market Cap: {{ formatMarketCap(crypto.market_cap) }}</p> -->
                  <!-- <p class="crypto-change d-flex align-items-center">
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
                    </span>
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Main Column with News Cards -->
        <div class="col-12 col-md-9" ref="newsContainer">
          <div class="row">
            <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="col-12 col-md-6 col-lg-4 mb-4">
              <div class="card h-100 news-card" style="max-height: 500px;">
                <img
                  v-if="newsItem.imageurl"
                  :src="newsItem.imageurl"
                  class="card-img-top"
                  alt="news image"
                  style="height: 200px; object-fit: cover;"
                />
                <div class="card-body d-flex flex-column">
                  <p>              <img  style="width: 35px;height: 35px;" :src="newsItem.source_info.img"> {{ newsItem.source_info.name }}</p>
                  <a :href="newsItem.url" target="_blank" class="mt-auto">
                    <h5 class="card-title">{{ newsItem.title }}</h5>
                  </a>
                  <p class="card-text text-muted">
                    {{ formatDate(newsItem.published_on) }}
                  </p>
                  <span style="font-size:10px;color:cornflowerblue;">{{ newsItem.categories }}</span>
                  <div class="card-content-scroll">
                    <!-- <p class="card-text">
                      {{ newsItem.body || 'No description available' }}
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Pagination -->
          <div v-if="!isLoading" class="d-flex justify-content-center">
            <span class="pointer mx-2" :disabled="currentPage === 1" @click="prevPage">
              <i class="bi bi-arrow-left-square"></i>
            </span>
            <span class="pointer mx-2" :disabled="currentPage === totalPages" @click="nextPage">
              <i class="bi bi-arrow-right-square"></i>
            </span>
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
      };
    },
    computed: {
      filteredCryptos() {
        return this.topCryptos.filter((crypto) =>
          crypto.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
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
      async fetchData() {
        try {
          await this.fetchNews();
          await this.fetchTopCryptos();
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
      async fetchNews() {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
        );
        const data = await response.json();
        this.news = data.Data;
        this.latestNews = data.Data;
      },
      async fetchTopCryptos() {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();
        this.topCryptos = data;
      },
      formatMarketCap(marketCap) {
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
        return `$${marketCap.toFixed(2)}`;
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
  .pointer {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black;
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
    background-color: #f8f9fa;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .crypto-icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  .crypto-info {
    display: flex;
    flex-direction: column;
  }
  .crypto-name {
    font-size: 0.9rem;
    /* font-weight: bold; */
  }
  .crypto-price,
  .crypto-market-cap,
  .crypto-change {
    font-size: 0.8rem;
    color: #6c757d;
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
  .card-content-scroll {
    max-height: 100px;
    overflow-y: auto;
  }
  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
  @media (max-width: 767px) {
    .fixed-sidebar {
      max-height: auto;
      position: static;
    }
    .sidebar-content,
    .card-content-scroll {
      overflow-y: auto;
    }
  }
  </style>
  