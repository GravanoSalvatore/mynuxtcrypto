  
  <template>
    <div style="">
      <!-- <CookieConsent /> -->
  
      <!-- Прелоадер отображается, пока компонент не загрузился -->
      <div v-if="loading" class="preloader text-white">
        <p>
          <img
            style="width: 300px;"
            src="../public/bull.webp"
          />
        </p>
      </div>
  
      <!-- Отображение компонентов, когда loading становится false -->
      <div v-else>
        <!-- <br/> <br/> -->
        <!-- <Price /> -->
        <News5 />
        <Popular/>
        <News3 />
<Logo/>
<Video/>
        <br/>
        <!-- <Price /> -->
        <AdvancedNewsSection />
        
        <News6 />
        
        <News3a />
        <NewsSection />
        <br />
        <News4 />
        <br />
      </div>
    </div>
  </template>
  
  <script>
  import NewsSection from '~/components/NewsSection.vue';
  import AdvancedNewsSection from '~/components/AdvancedNewsSection.vue';
  import News2 from '~/components/News2.vue';
  import News3a from '~/components/News3a.vue';
  import Popular from '~/components/PopularNews.vue';
  import News4 from '~/components/News4.vue';
  import News5 from '~/components/News5.vue';
  import News6 from '~/components/News6.vue';
  import Price from '~/components/Price.vue';
  import Logo from '~/components/Logo.vue';
  import Video from '~/components/Video.vue';
  import CookieConsent from '~/components/CookieConsent.vue';
  
  export default {
    components: {
      Popular,
      Video,
      NewsSection,
      AdvancedNewsSection,
      News2,
     Logo,
      News3a,
      News4,
      News5,
      News6,
      Price,
      CookieConsent,
    },
    data() {
      return {
        loading: true, // начальное состояние
      };
    },
    async created() {
      // Асинхронная загрузка компонента News3
      const { default: News3 } = await import('~/components/News3.vue');
      this.$options.components.News3 = News3;
  
      // Установка флага после загрузки News3
      this.loading = false;
    },
  };
  </script>
  