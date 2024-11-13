<template>
    <div class="tradingview-widgets-container row "> 
      <h3 class="text-center mb-4 fw-bold">Top charts</h3>
      <div
        v-for="(symbol, index) in topSymbols"
        :key="index"
        class="tradingview-widget   col-md-6 col-xl-3 col-lg-4 col-12 mb-4"
      >
     
        <TradingViewChart
          :symbol="symbol"
          :width="300"
          :height="300"
          :containerId="'tradingview_chart_' + index"
        />
      </div>
    </div>
  </template>
  
  <script>
  import TradingViewChart from '../components/Chart.vue';
  
  export default {
    components: { TradingViewChart },
    data() {
      return {
        topSymbols: [
          'BINANCE:BTCUSDT',
          'BINANCE:ETHUSDT',
          'BINANCE:BNBUSDT',
          'BINANCE:ADAUSDT',
          'BINANCE:XRPUSDT',
          'BINANCE:SOLUSDT',
          'BINANCE:DOGEUSDT',
          'BINANCE:DOTUSDT',
          'BINANCE:AVAXUSDT',
          'BINANCE:SHIBUSDT',
          'BINANCE:MATICUSDT',
          'BINANCE:LTCUSDT',
          'BINANCE:UNIUSDT',
          'BINANCE:BCHUSDT',
          'BINANCE:LINKUSDT',
          'BINANCE:ALGOUSDT',
          'BINANCE:ATOMUSDT',
          'BINANCE:VETUSDT',
          'BINANCE:ICPUSDT',
          'BINANCE:FILUSDT',
          'BINANCE:THETAUSDT',
          'BINANCE:TRXUSDT',
          'BINANCE:FTMUSDT',
          'BINANCE:XTZUSDT',
          'BINANCE:HBARUSDT',
          'BINANCE:NEARUSDT',
          'BINANCE:EOSUSDT',
          'BINANCE:CAKEUSDT',
          'BINANCE:AAVEUSDT',
          'BINANCE:KSMUSDT'
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .tradingview-widgets-container {
    margin-top: 30px;;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tradingview-widget {
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  