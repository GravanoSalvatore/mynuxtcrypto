<template>
    <div class="container my-4">
      <div class="row text-center">
        <div class="col-3 col-sm-3 col-md-2 col-lg-1" v-for="(logo, index) in logos" :key="index">
          <img :src="logo" alt="Logo" class="img-fluid logo-img" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Замените эти ссылки на реальные URL логотипов
        logos: [
       
        'https://coingape.com/wp-content/uploads/2023/06/coingape-logo.png',
          'https://cdn.newsroom.gg//medium/000/002/623/T7pHRvDzZH9Ktym-.png',
           'https://www.appengine.ai/uploads/images/profile/logo/TipRanks-AI.png',
           'https://m.media-amazon.com/images/I/51fWaV8RiFL.png', 
           'https://img.cryptorank.io/coins/blockworks1683708145136.png', 
           'https://007tg.com/wp-content/uploads/2022/04/4babb-www.newsbtc.com.png',
          'https://bitcoinworld.co.in/wp-content/uploads/Black-background-logo-BitcoinWorld.jpg', 
          'https://st2.latoken.com/cms/dataroom/4c6bce18-f9b4-46de-adf2-4a98480036d6.png', 
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhtEeglaATnXUtduoDsQ-X-lrUG0aYtji3g&s', 
          'https://f8n-production-collection-assets.imgix.net/0x99fD887EBc6dB7BD99dF05a496A4475b84395f94/41/nft.png',
          'https://w7.pngwing.com/pngs/126/248/png-transparent-cryptocompare-bitcoin-cryptocurrency-exchange-digital-currency-blockchain-company-text-service.png',
          ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJJMUL-WeurBRhyFBqeiYvOlMROUrPDRnOQ&s',
         
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .logo-img {
    max-width: 100%;
    height: auto;
    padding: 5px;
  }
  </style>
  