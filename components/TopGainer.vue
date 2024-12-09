<!-- <template>
    <div class="crypto-container">
      <div class="crypto-card">
        <span><img :src="topGainer.imageUrl" alt="crypto logo" class="crypto-logo" />
          <span class="change-positive">{{ topGainer.change }}%</span>
        </span>
      </div>
      <div class="crypto-card">
        <span><img :src="topLoser.imageUrl" alt="crypto logo" class="crypto-logo" />
          <span class="change-negative">{{ topLoser.change }}%</span>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        topGainer: {},
        topLoser: {},
        isLoading: true,
      };
    },
    async mounted() {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
        );
  
        // Обработка данных
        const data = response.data.Data;
        let topGainer = data[0];
        let topLoser = data[0];
  
        data.forEach((item) => {
          const changePct = item.RAW.USD.CHANGEPCT24HOUR;
  
          // Проверка для наибольшего роста
          if (changePct > topGainer.RAW.USD.CHANGEPCT24HOUR) {
            topGainer = item;
          }
  
          // Проверка для наибольшего падения
          if (changePct < topLoser.RAW.USD.CHANGEPCT24HOUR) {
            topLoser = item;
          }
        });
  
        // Запись данных в компонент
        this.topGainer = {
          name: topGainer.CoinInfo.FullName,
          symbol: topGainer.CoinInfo.Name,
          price: topGainer.RAW.USD.PRICE.toFixed(2),
          change: topGainer.RAW.USD.CHANGEPCT24HOUR.toFixed(2),
          imageUrl: `https://www.cryptocompare.com${topGainer.CoinInfo.ImageUrl}`,
        };
  
        this.topLoser = {
          name: topLoser.CoinInfo.FullName,
          symbol: topLoser.CoinInfo.Name,
          price: topLoser.RAW.USD.PRICE.toFixed(2),
          change: topLoser.RAW.USD.CHANGEPCT24HOUR.toFixed(2),
          imageUrl: `https://www.cryptocompare.com${topLoser.CoinInfo.ImageUrl}`,
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        this.isLoading = false;
      }
    },
  };
  </script>
  
  <style scoped>
  .crypto-container {
    display: flex;
    gap: 20px;
  }
  
  .crypto-card {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .crypto-logo {
    width: 30px;
    height: 30px;
  }
  
  .change-positive {
    
    color: #00ff00;
  }
  
  .change-negative {
    color: #ff0000;
  }
  
  .preloader {
    font-size: 1.5rem;
    color: #ffd700;
  }
  </style>
   -->
   <template>
    <div class="crypto-container">
      <div class="crypto-card">
        <img :src="topGainer.imageUrl" alt="" class="crypto-logo" />
        <div class="crypto-info">
          <span class="change-positive ">{{ topGainer.change }}%</span>
          <span class="crypto-name positive">{{ topGainer.name }}</span>
        </div>
      </div>
      <div class="crypto-card">
        <img :src="topLoser.imageUrl" alt="" class="crypto-logo" />
        <div class="crypto-info">
          <span class="change-negative">{{ topLoser.change }}%</span>
          <span class="crypto-name negative">{{ topLoser.name }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        topGainer: {},
        topLoser: {},
        isLoading: true,
      };
    },
    async mounted() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              price_change_percentage: "24h",
            },
          }
        );
  
        const data = response.data;
  
        let topGainer = data[0];
        let topLoser = data[0];
  
        data.forEach((coin) => {
          const changePct = coin.price_change_percentage_24h;
  
          if (changePct > topGainer.price_change_percentage_24h) {
            topGainer = coin;
          }
  
          if (changePct < topLoser.price_change_percentage_24h) {
            topLoser = coin;
          }
        });
  
        this.topGainer = {
          name: topGainer.name,
          symbol: topGainer.symbol.toUpperCase(),
          price: topGainer.current_price.toFixed(2),
          change: topGainer.price_change_percentage_24h.toFixed(2),
          imageUrl: topGainer.image,
        };
  
        this.topLoser = {
          name: topLoser.name,
          symbol: topLoser.symbol.toUpperCase(),
          price: topLoser.current_price.toFixed(2),
          change: topLoser.price_change_percentage_24h.toFixed(2),
          imageUrl: topLoser.image,
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        this.isLoading = false;
      }
    },
  };
  </script>
  
  <style scoped>
  .negative {
    color: #ff0000;
  }
  .positive {
    color: #03cd03;
  }
  .crypto-container {
    display: flex;
    gap: 20px;
  }
  
  .crypto-card {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  
  .crypto-logo {
    width: 30px;
    height: 30px;
  }
  
  .crypto-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .change-positive {
    font-size: 10px;
    color: #03cd03;
  }
  
  .change-negative {
    font-size: 10px;
    color: #ff0000;
  }
  
  .crypto-name {
    font-size: 0.7rem;
    margin-top: 2px;
    text-align: center;
  }
  </style>
  