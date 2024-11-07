<template>
    <div style="background-color: white;">
    <br/>    <br/>
    <CookieConsent/>
    <!-- <Price/> -->
    <News3 />
    <Price/>
    
        <AdvancedNewsSection />
        
        <News5 />
        <News6 />
        <News3a />
        
      <NewsSection />
      <br/>

      <!-- <News3 /> -->
      <!-- <News2 /> -->
      <News4 />
      <br/>
     

     
    </div>
  </template>
  
  <script>
  import NewsSection from '~/components/NewsSection.vue';
  import AdvancedNewsSection from '~/components/AdvancedNewsSection.vue';
  import News2 from '~/components/News2.vue';
  import News3 from '~/components/News3.vue';
  import News3a from '~/components/News3a.vue';
  import News4 from '~/components/News4.vue';
  import News5 from '~/components/News5.vue';
  import News6 from '~/components/News6.vue';
  import Price from '~/components/Price.vue';
  import CookieConsent from '~/components/CookieConsent.vue';
  export default {
    components: {
      NewsSection,
      AdvancedNewsSection,
      News2,
      News3,
      News3a,
      News4,
      News5,
      News6,
      Price,
      CookieConsent
    },
  };
  </script>
  
  