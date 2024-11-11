<template>
  <div style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
    <div v-if="loading" class="preloader text-white">
     <p> <img style="width: 300px;" src="../public/bull.png"></p>
       
      <!-- <p style="font-size: 63px;font-weight: bold;">Crypto bulls</p>    -->
    </div>
    <header>
    
      <nav style="background-color: rgba(12, 31, 74, 0.9);font-size: 14px;" class="navbar navbar-expand-lg navbar-white  fixed-top">
        <div class="container">
          <!-- <NuxtLink to="/" class="navbar-brand ">
          
            Crypto  <img style="width: 30px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"> Bulls
            </NuxtLink>
           -->
           <NuxtLink to="/" class="navbar-brand" style="position: absolute; left: 10px;">
            <img style="width: 50px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 16px;">CryptoCurrencyBulls</span>
        </NuxtLink>
        
        <button
            style="border: none !important; box-shadow: none !important; position: absolute; right: 10px;"
            class="navbar-toggler d-lg-none"
            type="button"
            @click="toggleSidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        > 
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto text">
              <span class="nav-link">
                <span class="text-warning">BTC:</span>
                <span class="text-white">
                  ${{ btcPrice }}
                  <span :class="btcChangeClass" class="ms-1">
                    <i class="bi" :class="btcArrow"></i>
                  </span>
                </span>
                
                <span class="text-primary">ETH:</span>
                <span class="text-white">
                  ${{ ethPrice }}
                  <span :class="ethChangeClass" class="ms-1">
                    <i class="bi" :class="ethArrow"></i>
                  </span>
                </span>
              </span>
              <li class="nav-item dropdown" ref="dropdownMenu">
                <a href="#" class="nav-link text-white" @click="toggleDropdown">Crypto base</a>
                <ul v-if="isDropdownOpen" class="dropdown-menu">
                  <li><NuxtLink to="/ai" class="dropdown-item">Artificial intelligence</NuxtLink></li>
                  <li class="nav-item">
                <NuxtLink to="/altcoins" class="dropdown-item ">Altcoins</NuxtLink>
              </li>
                  <li class="nav-item">
                <NuxtLink to="/about" class="dropdown-item " aria-current="page">Articles</NuxtLink>
              </li>
                  <li class="nav-item">
                <NuxtLink to="/crypto" class="dropdown-item ">Bitcoin & Ethereum</NuxtLink>
              </li>
             
              
              <li class="nav-item">
                <NuxtLink to="/contact" class="dropdown-item ">Blockchain people</NuxtLink>
              </li>
                 
                  <li class="nav-item">
                <NuxtLink to="/defi" class="dropdown-item">Defi</NuxtLink>
              </li>
                  <li><NuxtLink to="/it" class="dropdown-item">Information technology </NuxtLink></li>
                
                  <li><NuxtLink to="/ex" class="dropdown-item">Exchanges </NuxtLink></li>
                
                  
                </ul>
              </li>

              <li class="nav-item ">
                <NuxtLink to="/" class="nav-link text-white" aria-current="page">Crypto bulls news</NuxtLink>
              </li>
<!--              
              <li class="sidebar-item">
            <NuxtLink to="/privacy" class="nav-link text-white" >Privacy Policy</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/terms" class="nav-link text-white" >Terms of servise</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/aboutUs" class="nav-link text-white" >About Us</NuxtLink>
          </li> -->
             
            

             
            </ul>

<button class="btn" @click="toggleSearch">
  <i class="fa-brands fa-searchengin text-white"></i>
 
</button>


<form v-if="isSearchVisible" class="d-flex align-items-center" @submit.prevent="search">
  <input
    v-model="searchQuery"
    type="text"
    class="form-control me-1 text-white"
    placeholder="Search..."
    aria-label="Search"
  />
  <button type="button" class="btn" @click="search">
    <i class="bi bi-search"></i>
  </button>
  

</form>



           
          </div>
        </div>
      </nav>
  
     
      <aside style="background-color: rgba(12, 31, 74, 1);color: white;" :class="['sidebar', { open: isSidebarOpen }]">
        <button class="btn-close text-reset" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
  
        <NuxtLink to="/" class="navbar-brand" style="">
            <img style="width: 50px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 17px;">Crypto Bulls</span>
        </NuxtLink>
           
        <div class="sidebar-crypto-search d-lg-none mb-4 ">
          <div class="p-3">
            <span class="nav-link">
                <span class="text-warning">BTC:</span>
                <span class="">
                  ${{ btcPrice }}
                  <span :class="btcChangeClass" class="ms-1">
                    <i class="bi" :class="btcArrow"></i>
                  </span>
                </span>
                <br/>
                <span class="text-primary">ETH:</span>
                <span class="">
                  ${{ ethPrice }}
                  <span :class="ethChangeClass" class="ms-1">
                    <i class="bi" :class="ethArrow"></i>
                  </span>
                </span>
              </span> </div>
              <button class="btn" @click="toggleSearch">
  <i class="fa-brands fa-searchengin text-white"></i>
 
</button>


<form v-if="isSearchVisible" class="d-flex align-items-center" @submit.prevent="search">
  <input
    v-model="searchQuery"
    type="text"
    class="form-control me-1"
    placeholder="Search..."
    aria-label="Search"
  />
  <button type="button" class="btn" @click="search">
    <i class="bi bi-search"></i>
  </button>
  <!-- <div class="input-group">
  <input
    v-model="searchQuery"
    type="text"
    class="form-control"
    placeholder="Search..."
    aria-label="Search"
  />
  <span class="input-group-text" @click="search">
    <i class="bi bi-search"></i>
  </span>
</div> -->

</form>
        </div>
  
        <ul class="sidebar-nav ">
          <li class="sidebar-item">
            <NuxtLink to="/" class="sidebar-link " @click="toggleSidebar">News</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/about" class="sidebar-link" @click="toggleSidebar">Articles</NuxtLink>
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/sec" class="sidebar-link" @click="toggleSidebar">SEC</NuxtLink>
          </li> -->
          <li class="sidebar-item">
            <NuxtLink to="/ai" class="sidebar-link" @click="toggleSidebar">AI</NuxtLink>
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/dao" class="sidebar-link" @click="toggleSidebar">DAO</NuxtLink>
          </li> -->
          <li class="sidebar-item">
            <NuxtLink to="/contact" class="sidebar-link" @click="toggleSidebar">Blockchain People</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/crypto" class="sidebar-link" @click="toggleSidebar">Bitcoin & Ethereum</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/altcoins" class="sidebar-link" @click="toggleSidebar">Altcoins</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/defi" class="sidebar-link" @click="toggleSidebar">Defi</NuxtLink>
          </li>
          <li class="sidebar-item"><NuxtLink to="/it" class="sidebar-link" @click="toggleSidebar">Information technology </NuxtLink></li>
          <li class="sidebar-item"><NuxtLink to="/ex" class="sidebar-link" @click="toggleSidebar">Exchange</NuxtLink> </li>  
          <li class="sidebar-item">
            <NuxtLink to="/privacy" class="sidebar-link" @click="toggleSidebar">Privacy Policy</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/terms" class="sidebar-link" @click="toggleSidebar">Terms of servise</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/aboutUs" class="sidebar-link" @click="toggleSidebar">About Us</NuxtLink>
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/contact" class="sidebar-link" @click="toggleSidebar">Контакты</NuxtLink>
          </li> -->
         
        </ul>
        <div class="footer-social-icons text-center mt-4">
      <a href="https://facebook.com" target="_blank" class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" class="social-icon">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" class="social-icon">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://t.me/yourchannel" target="_blank" class="social-icon">
        <i class="fab fa-telegram-plane"></i>
      </a>
    </div>
    <div style="background-color: rgba(12, 31, 74, 0.9);" class="footer-bottom text-center py-3 px-3">
      &copy; 2024           <NuxtLink to="/" class="navbar-brand" style="">
            <img style="width: 30px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 17px;"> Crypto Bulls</span>
        </NuxtLink>. All rights reserved.
    </div>
   
      </aside>
    
     
      <div v-if="searchResults.length" class="container  search-results" style="background-color: white;">
        <div style="margin-top: 70px;" class="d-flex justify-content-between align-items-center">

          <button class="btn" @click="clearSearch">Close</button>
        </div>
        <div class="row">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="col-12 mb-3"
          >
            <div class="card search-result-card d-flex flex-row align-items-center">
              <img
                v-if="result.imageurl"
                :src="result.imageurl"
                class="img-fluid search-result-img"
                alt="news image"
              />
              <div class="card-body">
                <p>
                    <img  style="width: 35px;height: 35px;" :src="result.source_info.img">  
                    {{ result.source_info.name }}
                  </p>
                <a :href="result.url" target="_blank" class="text-dark">
                  <h5 class="card-title">{{ result.title }}</h5>
                </a>
                <p class="card-text text-muted">  {{ formatDate(result.published_on) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <br/>  <br/>  
      <Price/>
      <NuxtPage />

     
      <button
      v-show="showScrollTopButton"
      class="scroll-top-button"
      @click="scrollToTop"
    >
      ↑ 
    </button>
    <br/> <br/> <br/>


    <footer class="footer">
  <div class="container">
    <div class="row text-center text-md-start">
      
      <div class="col-12 col-md-4 mb-4">
        <h5 class="fw-bold"> 
          <!-- <img style="width: 30px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"> -->
          Crypto bulls</h5>
        <p>
          Get the latest cryptocurrency news, analysis and more. Subscribe so you don't miss anything important!
        </p>
      </div>

      <div class="col-12 col-md-4 mb-4">
  <h5 class="fw-bold">Quick Links</h5>
  <ul class="list-unstyled">
    <li><NuxtLink to="/" class="footer-link">Home</NuxtLink></li>
    <li class="sidebar-item">
            <NuxtLink to="/privacy" class="nav-link text-white" >Privacy Policy</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/terms" class="nav-link text-white" >Terms of servise</NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/aboutUs" class="nav-link text-white" >About Us</NuxtLink>
          </li>
    <!-- <li><NuxtLink to="/about" class="footer-link">About Us</NuxtLink></li> -->
    <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
  </ul>
</div>


<div class="col-12 col-md-4 mb-4 ">
  <h5 class="fw-bold">Newsletter Subscription</h5>
  <form @submit.prevent="subscribeNewsletter">
    <input
      type="email"
      v-model="email"
      class="form-control text-white"
      placeholder="Your Email"
    />
    <div class="container">
    <button class="btn-danger3 mt-2 w-100">Subscribe</button>
  </div>
  </form>
</div>

    </div>

    <!-- Социальные иконки -->
    <div class="footer-social-icons text-center mt-4">
      <a href="https://facebook.com" target="_blank" class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" class="social-icon">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" class="social-icon">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://t.me/yourchannel" target="_blank" class="social-icon">
        <i class="fab fa-telegram-plane"></i>
      </a>
    </div>

    <div class="footer-bottom text-center py-3" style="background-color: rgba(12, 31, 74, 0.9);">
      &copy; 2024   <NuxtLink to="/" class="navbar-brand" style="">
            <img style="width: 30px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 14px;">Crypto Bulls</span>
        </NuxtLink>. All rights reserved.
    </div>
  </div>
</footer>

    </header>
  </div>
  </template>
  
  <script>
   import Price from '../components/Price.vue';
  export default {
    components: {Price},
    beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.closeDropdownOnClickOutside);
  },
   
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
    data() {
      return {
        isSearchVisible: false,
        // isScrolled: false,
        isDropdownOpen: false,
        loading: true,
         showScrollTopButton: false,
      email: "",
        btcPrice: null,
        ethPrice: null,
        prevBtcPrice: null,
      prevEthPrice: null,
      btcArrow: '',
      ethArrow: '',
      btcChangeClass: '',
      ethChangeClass: '',
        isSidebarOpen: false,
        searchQuery: '',
        searchResults: []
      };
    },
    async mounted() {
      setTimeout(() => {
      this.loading = false;
    }, 500);
    await this.fetchCryptoPrices();
    setInterval(this.fetchCryptoPrices, 60000); 
      setTimeout(() => {
      this.loading = false;
    }, 500);
      await this.fetchCryptoPrices();
      window.addEventListener("scroll", this.handleScroll);
      document.addEventListener("click", this.closeDropdownOnClickOutside);
 
    },
    methods: {
    //   handleScroll() {
    //   this.showScrollTopButton = window.scrollY > 200;
    //   this.isScrolled = window.scrollY > 50; // обновляем состояние при прокрутке
    // },
    toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.clearSearch(); // Очистка при скрытии поля
    }
  },
  toggleDropdown(event) {
      this.isDropdownOpen = !this.isDropdownOpen;
      event.stopPropagation(); // Останавливаем всплытие события для открытия dropdown
    },
    closeDropdownOnClickOutside(event) {
      const dropdownMenu = this.$refs.dropdownMenu;
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
      if (!this.isSearchVisible) {
        this.clearSearch(); // Очистка при скрытии поля
      }
    },

    //   toggleDropdown() {
    //   this.isDropdownOpen = !this.isDropdownOpen;
    // },
      handleScroll() {
      this.showScrollTopButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    subscribeNewsletter() {
      if (this.email) {
        alert(`Спасибо за подписку, ${this.email}!`);
        this.email = "";
      } else {
        alert("Введите корректный email.");
      }
    },

      async fetchCryptoPrices() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        this.updatePrice('btc', data.bitcoin.usd);
        this.updatePrice('eth', data.ethereum.usd);
      } catch (error) {
        console.error('Ошибка при получении курсов криптовалют:', error);
      }
    },
    updatePrice(type, newPrice) {
      if (type === 'btc') {
        this.prevBtcPrice = this.btcPrice;
        this.btcPrice = newPrice.toFixed(2);
        this.setChangeIndicator('btc');
      } else if (type === 'eth') {
        this.prevEthPrice = this.ethPrice;
        this.ethPrice = newPrice.toFixed(2);
        this.setChangeIndicator('eth');
      }
    },
    setChangeIndicator(type) {
      if (type === 'btc' && this.prevBtcPrice !== null) {
        this.btcArrow = this.btcPrice > this.prevBtcPrice ? 'bi-arrow-up' : 'bi-arrow-down';
        this.btcChangeClass = this.btcPrice > this.prevBtcPrice ? 'text-success' : 'text-danger';
      }
      if (type === 'eth' && this.prevEthPrice !== null) {
        this.ethArrow = this.ethPrice > this.prevEthPrice ? 'bi-arrow-up' : 'bi-arrow-down';
        this.ethChangeClass = this.ethPrice > this.prevEthPrice ? 'text-success' : 'text-danger';
      }
    },
  
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      async search() {
        if (!this.searchQuery) return;
  
        try {
          const response = await fetch(
            `https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH,ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored`
          );
          const data = await response.json();
          this.searchResults = data.Data.filter(item =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        } catch (error) {
          console.error('Ошибка при поиске новостей:', error);
        }
      },
      clearSearch() {
        this.searchQuery = '';
        this.searchResults = [];
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Преобразование Unix timestamp в миллисекунды
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    }
  };
  </script>
  
  <style scoped>
  .btn-danger3:hover {
    transform: perspective(500px) translateZ(20px);
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.8), inset 0px -3px 12px rgba(255, 255, 255, 0.2);
  }
  .btn-danger3 {
    border-radius: none !important;
    z-index: 1;
    left: 5px;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    font-size: 13px;
    padding: 10px 9px;
    border: 2px solid orange;
        border-radius: 17px;
        background: linear-gradient(135deg,#123c63 0%,#0a243d 50%, #291919 100%);
  background-size: 200% 200%;
  animation: marbleGradientAnimation 5s ease infinite;
  /* box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.6), inset 0px -2px 8px rgba(255, 255, 255, 0.2);
  transform: perspective(500px) translateZ(30px); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
        background-color:#091520; 
        background-size: 200% 200%;
       
        transform: perspective(500px) translateZ(30px);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  ::placeholder{
    color: white;
  }
  .input-group-text {
  cursor: pointer;
  background: none; /* Убирает фон */
  border: none; /* Убирает границу */
}

  .input-group {
  position: relative;
  display: flex;
}

.form-control {
  background-color: transparent !important;
  padding-right: 2.5rem; /* Добавляем пространство для кнопки справа */
}

.input-btn {
  position: absolute;
  right: 5px; /* Отступ от правого края поля ввода */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

  /* ::placeholder{
    background-color: (12, 31, 74, 0.9);
  } */
  .text-success {
  color: green;
}
.text-danger {
  color: red;
}
  .footer-social-icons {
  margin-top: 20px;
}

.social-icon {
  color: #ffffff;
  font-size: 24px;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #3d96ef;
}

  a{
    text-decoration: none;
  }
  .navbar {
    height: 55px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  .navbar-brand {
    color: #1a709e;
    /* font-weight: bold; */
  }
  .nav-link {
    transition: color 0.3s;
  }
  .nav-link:hover {
    color: #ff7f50;
  }
  
  /* Стили для поля поиска */
  .search-form {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  ::placeholder, .bi-search{
    color: rgb(166, 183, 210);
  }
  .search-form input {
    color:white;
    max-width: 200px;
  background-color: rgba(12, 31, 74, 0.9);
  }
  
  input , .btn-close {
    border: none !important;
    box-shadow: none !important;
  }
  
  /* Стили для карточек результатов поиска */
  .search-result-card {
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  .search-result-img {
    width: 120px;
    height: 100%;
    object-fit: cover;
    margin-right: 1rem;
  }
  .search-result-card .card-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0;
  }
  .search-result-card .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
  
  /* Стили для бокового меню */
  /* .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: white;
    padding-top: 60px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1050;
  } */
  .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 320px;
  background-color: white;
  padding-top: 60px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1050;
  overflow-y: auto; /* Добавлено для вертикальной прокрутки */
  max-height: 100vh; /* Ограничение высоты меню */
}

  .sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-crypto-search {
    padding: 1rem;
    border-bottom: 1px solid #495057;
  }
  
  .sidebar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  
  
  .sidebar-link {
    color:white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
    transition: background-color 0.3s ease;
  }
  
  .sidebar-link:hover {
    /* border-radius: 13px; */
    background-color: #f0f0f0;
    color:#091520;
  }
  
  .btn-close {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: #000;
  }
  .scroll-top-button {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  font-size: 16px;
  /* background-color: #007bff;
  color: white; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.scroll-top-button:hover {
  opacity: 1;
}

/* Футер */
.footer {
  background-color:rgba(12, 31, 74, 0.9);
  color: #ffffff;
  padding: 30px 0;
}
.footer h5 {
  color:orange;
}
.footer-link {
  color: #ffffff;
  transition: color 0.3s;
}
.footer-link:hover {
  color: #ff7f50;
}
.footer-bottom {
  background-color:transparent !important;
  font-size: 0.9rem;
  color: #6c757d;
  padding: 15px 0;
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
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 8px solid #ffffff;
  width: 60px;
  height: 60px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.navbar-toggler {
  display: none; /* Скрыть по умолчанию */
}

@media (max-width: 991px) {
  .navbar-toggler {
    display: inline-block; /* Показать на малых экранах */
  }
}
.dropdown-menu {
  position: absolute;
  right: 0px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  list-style: none;
  padding: 10px;
  display: block;
  min-width: 200px;
}

.dropdown-item {
  padding: 8px 12px;
  color: #091520;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color:rgba(12, 31, 74, 0.9); 
  color: white;
}
/* .dropdown-menu:hover {
  background-color:rgba(12, 31, 74, 0.9); 
  color: white;
} */
  </style>
   
   