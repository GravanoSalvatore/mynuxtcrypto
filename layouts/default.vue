<template>
 <div :class="{ 'dark-mode': isDarkMode }" style="font-family: Verdana, Geneva, Tahoma, sans-serif">
  <!-- {{ isDarkMode ? 'Dark mode активен' : 'Light mode активен' }}
     -->
  <div v-if="loading" class="preloader text-white">
      <p>
        <img
          
          style="width: 300px"
          src="../public/bull.webp"
        />
      </p>

      <!-- <p style="font-size: 63px;font-weight: bold;">Crypto bulls</p>    -->
    </div>
    <header>
      <nav
        style="background-color: rgba(12, 31, 74, 0.9); font-size: 14px"
        class="navbar navbar-expand-lg navbar-white fixed-top"
      >
        <div class="container">
          <!-- <NuxtLink to="/" class="navbar-brand ">
          
            Crypto  <img style="width: 30px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"> Bulls
            </NuxtLink>
           -->
          <NuxtLink
            to="/"
            class="navbar-brand"
            style="position: absolute; left: 10px"
          >
          <img
         
           style="width: 50px;font-size: 15px" 
           src="../public/bull.webp" />
            <span  style="font-size: 16px"  class="text-warning fw-bold" 
              >Crypto Bulls</span
            >
          </NuxtLink>
          <button @click="toggleThemeWithLog" class="theme-toggle-btn mx-auto">
            <i :class="isDarkMode ? 'fas fa-moon' : 'fas fa-sun text-white'"></i>
          </button>
          <button
            style="
              border: none !important;
              box-shadow: none !important;
              position: absolute;
              right: 10px;
            "
            class="navbar-toggler d-lg-none"
            type="button"
            @click="toggleSidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="white"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
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

                <span style="color: cornflowerblue;" class="">ETH:</span>
                <span class="text-white">
                  ${{ ethPrice }}
                  <span :class="ethChangeClass" class="ms-1">
                    <i class="bi" :class="ethArrow"></i>
                  </span>
                </span>
              </span>
              <li class="nav-item dropdown" ref="dropdownMenu">
                <a href="#" class="nav-link text-white" @click="toggleDropdown"
                  >Crypto labs</a
                >
                <ul  :class="['dropdown-menu', isDarkMode ? 'dark-dropdown' : 'light-dropdown']" v-if="isDropdownOpen">
                  <li>
                    <NuxtLink to="/ai" class="dropdown-item"
                      >Artificial intelligence</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/altcoins" class="dropdown-item"
                      >Altcoins</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink
                      to="/about"
                      class="dropdown-item"
                      aria-current="page"
                      >Articles</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/crypto" class="dropdown-item"
                      >Bitcoin & Ethereum</NuxtLink
                    >
                  </li>

                  <li class="nav-item">
                    <NuxtLink to="/contact" class="dropdown-item"
                      >Blockchain people</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/chartsCrypto" class="dropdown-item"
                      >Charts
                    </NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/defi" class="dropdown-item">Defi</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/it" class="dropdown-item"
                      >Information technology
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/ex" class="dropdown-item"
                      >Exchanges
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/wallets" class="dropdown-item"
                      >Wallets
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <NuxtLink to="/" class="nav-link text-white" aria-current="page"
                  >Crypto bulls news</NuxtLink
                >
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
              <img style="width: 35px;height: 35px;" src="https://static.vecteezy.com/system/resources/thumbnails/037/047/109/small_2x/ai-generated-stylized-globe-icon-symbol-3d-isolated-on-transparent-background-png.png"/>
              <!-- <i class="fa-brands fa-searchengin text-white"></i> -->
            </button>

            <form
              v-if="isSearchVisible"
              class="d-flex align-items-center"
              @submit.prevent="search"
            >
              <input
              style="background-color: transparent !important;"
                v-model="searchQuery"
                type="text"
                class="form-control me-1 text-white"
                placeholder="Search..."
                aria-label="Search"
              />
              <button type="button" class="btn" @click="search">
                <i style="font-size: 10px" class="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
      
      <!-- <button @click="toggleThemeWithLog">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</button>
    -->
   

      <aside
        style="background-color:  #091520; color: white"
        :class="['sidebar', { open: isSidebarOpen }]"
      >
        <button class="btn-close text-reset" @click="toggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
            />
          </svg>
        </button>

        <NuxtLink to="/" class="navbar-brand" style="">
          <img style="width: 50px" src="../public/bull.webp" />
          <span class="text-warning fw-bold" style="font-size: 17px"
            >Crypto Bulls</span
          >
        </NuxtLink>

        <div class="sidebar-crypto-search d-lg-none mb-4">
          <div class="p-3">
            <span class="nav-link">
              <span class="text-warning">BTC:</span>
              <span class="">
                ${{ btcPrice }}
                <span :class="btcChangeClass" class="ms-1">
                  <i class="bi" :class="btcArrow"></i>
                </span>
              </span>
              <br />
              <span style="color: cornflowerblue;" class="">ETH:</span>
              <span class="">
                ${{ ethPrice }}
                <span :class="ethChangeClass" class="ms-1">
                  <i class="bi" :class="ethArrow"></i>
                </span>
              </span>
            </span>
          </div>
          <button class="btn" @click="toggleSearch">
              <img style="width: 35px;height: 35px;" src="https://static.vecteezy.com/system/resources/thumbnails/037/047/109/small_2x/ai-generated-stylized-globe-icon-symbol-3d-isolated-on-transparent-background-png.png"/>
              <!-- <i class="fa-brands fa-searchengin text-white"></i> -->
            </button>

            <form
              v-if="isSearchVisible"
              class="d-flex align-items-center"
              @submit.prevent="search"
            >
              <input
              style="background-color: transparent !important;"
                v-model="searchQuery"
                type="text"
                class="form-control me-1 text-white"
                placeholder="Search..."
                aria-label="Search"
              />
              <button type="button" class="btn" @click="search">
                <i style="font-size: 10px" class="bi bi-search"></i>
              </button>
            </form>
        </div>

        <ul style="" class="sidebar-nav">
          <li class="sidebar-item">
            <NuxtLink to="/" class="sidebar-link" @click="toggleSidebar"
              >News</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/about" class="sidebar-link" @click="toggleSidebar"
              >Articles</NuxtLink
            >
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/sec" class="sidebar-link" @click="toggleSidebar">SEC</NuxtLink>
          </li> -->
          <li class="sidebar-item">
            <NuxtLink to="/ai" class="sidebar-link" @click="toggleSidebar"
              >AI</NuxtLink
            >
          </li>
          <!-- <li class="sidebar-item">
            <NuxtLink to="/dao" class="sidebar-link" @click="toggleSidebar">DAO</NuxtLink>
          </li> -->
          <li class="sidebar-item">
            <NuxtLink to="/contact" class="sidebar-link" @click="toggleSidebar"
              >Blockchain People</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/crypto" class="sidebar-link" @click="toggleSidebar"
              >Bitcoin & Ethereum</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/altcoins" class="sidebar-link" @click="toggleSidebar"
              >Altcoins</NuxtLink
            >
          </li>
          <li>
                    <NuxtLink to="/chartsCrypto" class="sidebar-link"
                      >Charts
                    </NuxtLink>
                  </li>
          <li class="sidebar-item">
            <NuxtLink to="/defi" class="sidebar-link" @click="toggleSidebar"
              >Defi</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/it" class="sidebar-link" @click="toggleSidebar"
              >Information technology
            </NuxtLink>
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/ex" class="sidebar-link" @click="toggleSidebar"
              >Exchange</NuxtLink
            >
          </li>
          <NuxtLink to="/wallets" class="sidebar-link"
                      >Wallets
                    </NuxtLink>
          <li class="sidebar-item">
            <NuxtLink to="/privacy" class="sidebar-link" @click="toggleSidebar"
              >Privacy Policy</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/terms" class="sidebar-link" @click="toggleSidebar"
              >Terms of servise</NuxtLink
            >
          </li>
          <li class="sidebar-item">
            <NuxtLink to="/aboutUs" class="sidebar-link" @click="toggleSidebar"
              >About Us</NuxtLink
            >
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
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            class="social-icon"
          >
            <i class="fab fa-telegram-plane"></i>
          </a>
        </div>
        <div
          style="background-color: rgba(12, 31, 74, 0.9)"
          class="footer-bottom text-center py-3 px-3"
        >
          &copy; 2024
          <NuxtLink to="/" class="navbar-brand" style="">
            <img style="width: 25px" src="../public/bull.webp" />
            <span class="text-warning " style="font-size: 15px">
              Crypto Bulls</span
            > </NuxtLink
          >. All rights reserved.
        </div>
      </aside>

      <div
      :class="['dropdown-menu', isDarkMode ? 'dark-dropdown' : 'light-dropdown']"
        v-if="searchResults.length"
        class="container search-results"
        style=""
      >
        <div
          style="margin-top: 70px"
          class="d-flex justify-content-between align-items-center"
        >
          <span class="pointer" @click="clearSearch">Close</span>
        </div>
        <div class="row">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="col-12 mb-3"
          >
            <div
              class="car search-result-card d-flex flex-row align-items-center"
            >
              <img
                v-if="result.imageurl"
                :src="result.imageurl"
                class="img-fluid search-result-img"
                alt="news image"
              />
              <div class="card-body">
                <p>
                  <img
                    style="width: 35px; height: 35px"
                    :src="result.source_info.img"
                  />
                  {{ result.source_info.name }}
                </p>
                <a :href="result.url" target="_blank" class="">
                  <h5 class="card-title">{{ result.title }}</h5>
                </a>
                <p class="card-text ">
                  {{ formatDate(result.published_on) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <Price />
     
      <NuxtPage />

      <button
        v-show="showScrollTopButton"
        class="scroll-top-button"
        @click="scrollToTop"
      >
        ↑
      </button>
      <br />
      <br />
      <br />
      <hr/>
      <footer class="footer">
        <div class="container">
          <div class="row text-center text-md-start">
            <div class="col-12 col-md-3 mb-4">
              <h5 class="fw-bold">Quick Links</h5>
              <ul class="list-unstyled">
                <li><NuxtLink to="/" class="nav-link">Home</NuxtLink></li>
                <li>
                    <NuxtLink to="/ai" class="nav-link"
                      >Artificial intelligence</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/altcoins" class="nav-link"
                      >Altcoins</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink
                      to="/about"
                      class="nav-link"
                      aria-current="page"
                      >Articles</NuxtLink
                    >
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/crypto" class="nav-link"
                      >Bitcoin & Ethereum</NuxtLink
                    >
                  </li>

                  <li class="nav-item">
                    <NuxtLink to="/contact" class="nav-link"
                      >Blockchain people</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink to="/chartsCrypto" class="nav-link"
                      >Charts
                    </NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink to="/defi" class="nav-link">Defi</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/it" class="nav-link"
                      >Information technology
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/ex" class="nav-link"
                      >Exchanges
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/wallets" class="nav-link"
                      >Wallets
                    </NuxtLink>
                  </li>
                <li class="sidebar-item">
                  <NuxtLink to="/privacy" class="nav-link "
                    >Privacy Policy</NuxtLink
                  >
                </li>
                <li class="sidebar-item">
                  <NuxtLink to="/terms" class="nav-link "
                    >Terms of servise</NuxtLink
                  >
                </li>
                <li class="sidebar-item">
                  <NuxtLink to="/aboutUs" class="nav-link"
                    >About Us</NuxtLink
                  >
                </li>
                <!-- <li><NuxtLink to="/about" class="footer-link">About Us</NuxtLink></li> -->
                <li>
                  <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-3 mb-4">
              <h5 class="fw-bold">Crypto News</h5>
              <div class="image-grid">
    <div v-for="(image, index) in images" :key="index" class="image-item">
   <a :href="image.url2"  target="_blank">  <img style="border:1px solid orange" :src="image.url" alt="News Image" /></a>
    </div>
  </div>
            </div>
           
            <div class="col-12 col-md-3 mb-4">
              <h5 class="fw-bold">
                <!-- <img style="width: 30px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/640px-Buffalo_Bulls_Athletic_Logo.svg.png"> -->
                Crypto bulls
              </h5>
              <p>

                is an innovative platform for distributing news about blockchain, cryptocurrencies, and IT technologies from around the world. We specialize in providing up-to-date and quality information and content.

Our goal is to be a reliable source of information for everyone interested in cryptocurrencies and technology. We strive to keep our users informed of the latest events and trends in the crypto world.


                
            
              </p>
            </div>
           
            <div class="col-12 col-md-3 mb-4">
              
              <h5 class="fw-bold">Subscription</h5>
              <img style="max-width: 150px;" src="../public/bull.webp"><br/>
              Get the latest cryptocurrency news, analysis and more. Subscribe
              so you don't miss anything important!
              <form @submit.prevent="subscribeNewsletter">
                <input
                style="background-color: transparent !important;"
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
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              class="social-icon"
            >
              <i class="fab fa-telegram-plane"></i>
            </a>
          </div>

          <div
            class="footer-bottom text-center py-3"
            style=""
          >

            <NuxtLink to="/" class="navbar-brand" style="">
              <img style="width: 30px" src="../public/bull.webp" />
              <span class="text-warning fw-bold" style="font-size: 14px"
                >Crypto Bulls</span
              > </NuxtLink
            >. All rights reserved.&copy; 2024
          </div>
        </div>
      </footer>
    </header>
  </div>
</template>

<script>
import { useThemeStore } from '../stores/themeStore.js';
import { ref, onMounted, watch } from 'vue';
import Price from "../components/Price.vue";
export default {
  setup() {
    const themeStore = useThemeStore();
    const isDarkMode = computed(() => themeStore.isDarkMode);  // Создаём реактивную переменную
    const loading = ref(true);

    onMounted(() => {
      console.log('Mounted: Initializing theme...');
      themeStore.loadTheme();
      console.log('isDarkMode после загрузки:', themeStore.isDarkMode);
      
      setTimeout(() => {
        loading.value = false;
        console.log('Loading complete:', loading.value);
      }, 500);
    });
    watch(isDarkMode, (newVal) => {
      console.log('Тема обновлена:', newVal ? 'Dark mode' : 'Light mode');
    });

    function toggleThemeWithLog() {
      console.log('Toggle theme clicked');
      themeStore.toggleTheme(); // Меняем тему в хранилище
      console.log('New isDarkMode value after toggle:', isDarkMode.value);
    }

    return {
      loading,
      toggleThemeWithLog,
      isDarkMode,
    };

  },
  components: { Price },
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
      images: [],
      showScrollTopButton: false,
      email: "",
      btcPrice: null,
      ethPrice: null,
      prevBtcPrice: null,
      prevEthPrice: null,
      btcArrow: "",
      ethArrow: "",
      btcChangeClass: "",
      ethChangeClass: "",
      isSidebarOpen: false,
      searchQuery: "",
      searchResults: [],
    };
  },
  async mounted() {
   
    await this.fetchImages();

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
    async fetchImages() {
      try {
        const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
        const data = await response.json();
        this.images = data.Data.slice(0, 12).map(item => ({ url: item.imageurl,url2:item.url}));
      } catch (error) {
        console.error("Ошибка загрузки изображений:", error);
      }
    },
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
    // toggleSearch() {
    //   this.isSearchVisible = !this.isSearchVisible;
    //   if (!this.isSearchVisible) {
    //     this.clearSearch(); // Очистка при скрытии поля
    //   }
    // },

    //   toggleDropdown() {
    //   this.isDropdownOpen = !this.isDropdownOpen;
    // },
    handleScroll() {
      this.showScrollTopButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        this.updatePrice("btc", data.bitcoin.usd);
        this.updatePrice("eth", data.ethereum.usd);
      } catch (error) {
        console.error("Ошибка при получении курсов криптовалют:", error);
      }
    },
    updatePrice(type, newPrice) {
      if (type === "btc") {
        this.prevBtcPrice = this.btcPrice;
        this.btcPrice = newPrice.toFixed(2);
        this.setChangeIndicator("btc");
      } else if (type === "eth") {
        this.prevEthPrice = this.ethPrice;
        this.ethPrice = newPrice.toFixed(2);
        this.setChangeIndicator("eth");
      }
    },
    setChangeIndicator(type) {
      if (type === "btc" && this.prevBtcPrice !== null) {
        this.btcArrow =
          this.btcPrice > this.prevBtcPrice ? "bi-arrow-up" : "bi-arrow-down";
        this.btcChangeClass =
          this.btcPrice > this.prevBtcPrice ? "text-success" : "text-danger";
      }
      if (type === "eth" && this.prevEthPrice !== null) {
        this.ethArrow =
          this.ethPrice > this.prevEthPrice ? "bi-arrow-up" : "bi-arrow-down";
        this.ethChangeClass =
          this.ethPrice > this.prevEthPrice ? "text-success" : "text-danger";
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
        this.searchResults = data.Data.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } catch (error) {
        console.error("Ошибка при поиске новостей:", error);
      }
    },
    clearSearch() {
      this.searchQuery = "";
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
  },
};
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.image-item img {
  
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.pointer{
  cursor: pointer;
}
.social-icon:hover{
 color: cornflowerblue;
}

.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: white; /* Поддержка изменения цвета в зависимости от темы */
  transition: color 0.3s ease;
  position: absolute;
  right: 60px; /* Подгоните это значение под ваше меню */
}

.theme-toggle-btn i {
  color: var(--text-color);
}


/* Стили для светлой темы dropdown */
.light-dropdown {
  background-color: #ffffff;
  color: #091520;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* .light-dropdown .dropdown-item:hover {
  background-color: rgba(230, 230, 230, 0.9);
  color: #091520;
} */

/* Стили для темной темы dropdown */
.dark-dropdown {
  background-color: #091520;
  color: white; /* Устанавливает белый цвет текста в тёмной теме */
  box-shadow: 0 4px 8px rgba(238, 235, 235, 0.3);
}

.dark-dropdown .dropdown-item {
  background-color: #091520;
  color: white; /* Устанавливает белый цвет текста для каждого элемента */
}

/* .dark-dropdown .dropdown-item:hover {
  background-color: #555555;
  color: white;
} */

.dark-mode {
  background-color: #091520; /* или другой цвет для темной темы */
  color:white; /* для текста */
}
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

.dark-mode {
  --background-color:#091520;
  --text-color: white;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
.btn-danger3:hover {
  transform: perspective(500px) translateZ(20px);
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.8), inset 0px -3px 12px rgba(255, 255, 255, 0.2);
}
.btn-danger3 {
  z-index: 1;
  color: white;
  font-weight: bold;
  font-size: 13px;
  padding: 10px 9px;
  border: 2px solid orange;
  border-radius: 17px;
  background: linear-gradient(135deg,#123c63 0%,#0a243d 50%, #291919 100%);
  background-size: 200% 200%;
  animation: marbleGradientAnimation 5s ease infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

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
  /* color: #ffffff; */
  font-size: 24px;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #3d96ef;
}

a {
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
  color:orange;
}

/* Стили для поля поиска */
.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
}
::placeholder,
.bi-search {
  color: rgb(166, 183, 210);
}
.search-form input {
  color: white;
  max-width: 200px;
  background-color: rgba(12, 31, 74, 0.9);
}

input,
.btn-close {
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
  /* color: #6c757d; */
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
  color: cornflowerblue;
  /* color: white; */
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  transition: background-color 0.3s ease;
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
  /* background-color: rgba(12, 31, 74, 0.9); */
  /* color: #ffffff; */
  padding: 30px 0;
}
.footer h5 {
  color:cornflowerblue;
}
.footer-link {
  
  transition: color 0.3s;
}
.footer-link:hover {
  color: #ff7f50;
}
.footer-bottom {
  background-color: transparent !important;
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  /* border: 1px solid #ccc; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  list-style: none;
  padding: 10px;
  display: block;
  min-width: 200px;
}

.dropdown-item {
  padding: 8px 12px;
  /* color: #091520; */
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
}


</style>
