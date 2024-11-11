<!-- <template>
  <div style="background-color: #091520;"  class="cookie-consent fixed-bottom p-3 shadow-lg">
    <div class="d-flex justify-content-between align-items-center text-white">
      <div>
        <h5>Cookie Notice</h5>
        <p>The CryptoCurrencyBulls website uses cookies to personalize services and enhance your experience on the site.</p>
        <p>If you do not wish for your user data to be processed, please limit cookie usage in your browser settings.</p>
      </div>
      <div class="">
        <button class=" btn-danger3 me-2" @click="acceptCookies">Accept</button><br/>
        <button class=" btn-danger3 mt-2" @click="toggleDetails">Learn More</button>
      </div>
    </div>

    <div v-if="showDetails" class="mt-2 text-white p-1">
      <h6>Detailed Cookie Policy</h6>
      <p>Our site uses essential and additional cookies to provide an optimal user experience.</p>
      <ul>
        <li>Essential cookies are necessary for basic functionality.</li>
        <li>Analytical cookies help us understand user behavior.</li>
        <li>Advertising cookies allow us to display targeted ads.</li>
      </ul>
      <img style="width: 50px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 16px;">CryptoCurrencyBulls</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieConsent',
  data() {
    return {
      showConsent: false,
      showDetails: false,
    };
  },
  mounted() {
    this.checkCookieConsent();
  },
  methods: {
    checkCookieConsent() {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        this.showConsent = true;
      }
    },
    acceptCookies() {
      localStorage.setItem('cookieConsent', 'accepted');
      this.showConsent = false;
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
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
.cookie-consent {
  z-index: 1050; /* Above most other elements */
}
p {
  font-size: 12px;
}
li {
  font-size: 12px;
}
</style> -->
<template>
  <div v-if="showConsent" style="background-color: #091520;" class="cookie-consent fixed-bottom p-3 shadow-lg">
    <div class="d-flex justify-content-between align-items-center text-white">
      <div>
        <img style="width: 50px;" src="../public/bull.png">
            <span class="text-warning fw-bold" style="font-size: 16px;">CryptoCurrencyBulls</span>
        <h5>Cookie Notice</h5>
        <p>The CryptoCurrencyBulls website uses cookies to personalize services and enhance your experience on the site.</p>
        <p>If you do not wish for your user data to be processed, please limit cookie usage in your browser settings.</p>
      </div>
      <div class="">
        <button class="btn-danger3 me-2" @click="acceptCookies">Accept</button><br/>
        <button class="btn-danger3 mt-2" @click="toggleDetails">Learn More</button>
      </div>
    </div>

    <div v-if="showDetails" class="mt-2 text-white p-1">
      <h6>Detailed Cookie Policy</h6>
      <p>Our site uses essential and additional cookies to provide an optimal user experience.</p>
      <ul>
        <li>Essential cookies are necessary for basic functionality.</li>
        <li>Analytical cookies help us understand user behavior.</li>
        <li>Advertising cookies allow us to display targeted ads.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieConsent',
  data() {
    return {
      showConsent: false,
      showDetails: false,
    };
  },
  mounted() {
    this.checkCookieConsent();
  },
  methods: {
    checkCookieConsent() {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        this.showConsent = true; // Show the banner if consent is not found
      }
    },
    acceptCookies() {
      localStorage.setItem('cookieConsent', 'accepted'); // Save consent in localStorage
      this.showConsent = false; // Hide the banner after consent
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>

<style scoped>
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
.cookie-consent {
  z-index: 1050;
}
p {
  font-size: 12px;
}
li {
  font-size: 12px;
}
</style>
