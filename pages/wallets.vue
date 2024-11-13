<template>
  <div class="container"> 
  <div class=" mt-5">
    <articleWalletsVue/>
    <br/><br/>
    <!-- Article Heading -->
    <div class="text-center mb-5">
      <h1 class="fw-bold">Popular Cryptocurrency Wallets: MetaMask, Electrum, Ledger, and More</h1>
      <p>A comprehensive guide on using, installing, and securing your cryptocurrency wallets.</p>
    </div>

    <!-- Hot Wallets Section -->
    <h2 class="fw-bold text-center text-danger">Hot Wallets</h2>
    <div class="row">
      <!-- MetaMask Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/640px-MetaMask_Fox.svg.png" class="card-img-top" alt="MetaMask Wallet" />
          <div class="car-body">
            <h5 class="car-title">MetaMask Wallet</h5>
            <p  class="car-text">MetaMask is a popular Ethereum wallet available as a browser extension. It enables users to store, send, and receive Ethereum and ERC-20 tokens.</p>
            <button class="btn-danger3" @click="toggleMetaMaskDetails">{{ showMetaMaskDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showMetaMaskDetails" class="mt-3 text">
              <h6>How to Install MetaMask:</h6>
              <ol>
                <li>Visit <a href="https://metamask.io/" target="_blank">MetaMask’s website</a> and install the browser extension.</li>
                <li>Create a strong password and securely store your recovery phrase.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Only use MetaMask on secure devices.</li>
                <li>Never share your recovery phrase.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Electrum Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://play-lh.googleusercontent.com/2dEx8K8AnAa8L0xvwKDBQXA--DdTsCqxEJmNvG49KyO5x4YSgQFbZPGANdYYITHtIro" class="card-img-top" alt="Electrum Wallet" />
          <div class="car-body">
            <h5 class="car-title">Electrum Wallet</h5>
            <p class="car-text">Electrum is a Bitcoin wallet known for its speed and security. It’s ideal for users who prioritize efficient Bitcoin transactions.</p>
            <button class="btn-danger3" @click="toggleElectrumDetails">{{ showElectrumDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showElectrumDetails" class="mt-3">
              <h6>How to Install Electrum:</h6>
              <ol>
                <li>Visit <a href="https://electrum.org/" target="_blank">Electrum’s website</a> and download the app.</li>
                <li>Set up with a secure password and recovery phrase.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Download from the official site only.</li>
                <li>Keep your recovery phrase offline.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    <!-- Trust Wallet Card -->
    <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/trustwallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-crypto-coin-cryptocurrency-pack-logos-icons-8263882.png" class="card-img-top" alt="Trust Wallet" />
          <div class="car-body">
            <h5 class="car-title">Trust Wallet</h5>
            <p class="car-text">Trust Wallet is a mobile wallet for both iOS and Android that supports a wide range of cryptocurrencies. It provides users with full control over their private keys.</p>
            <button class="btn-danger3" @click="toggleTrustWalletDetails">{{ showTrustWalletDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showTrustWalletDetails" class="mt-3">
              <h6>How to Install Trust Wallet:</h6>
              <ol>
                <li>Download from the <a href="https://trustwallet.com/" target="_blank">Trust Wallet website</a> or from your mobile app store.</li>
                <li>Follow the setup instructions and write down your recovery phrase.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Set a strong password for your device and wallet.</li>
                <li>Regularly update the app for security patches.</li>
                <li>Be cautious about which dApps you connect to Trust Wallet.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Exodus Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://zengo.com/wp-content/uploads/Exodus_200x200@x2-150x150@2x.png" class="card-img-top" alt="Exodus Wallet" />
          <div class="car-body">
            <h5 class="car-title">Exodus Wallet</h5>
            <p class="car-text">Exodus is a beginner-friendly desktop and mobile wallet that supports multiple assets, with an easy-to-use interface and built-in exchange features.</p>
            <button class="btn-danger3" @click="toggleExodusDetails">{{ showExodusDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showExodusDetails" class="mt-3">
              <h6>How to Install Exodus:</h6>
              <ol>
                <li>Download from the <a href="https://exodus.com/" target="_blank">Exodus website</a>.</li>
                <li>Install the app on your computer or mobile device and complete the setup.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Keep your recovery phrase safe and offline.</li>
                <li>Enable security settings within the app for added protection.</li>
                <li>Use Exodus's built-in backup options.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Mycelium Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img style="border-radius:" src="https://www.coindesk.com/resizer/r0BEMkXQ81Cly-ZCUy9Q-qVlxTI=/567x425/filters:quality(80):format(jpg)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/CEAWF2LR4VF7FCTCALNHUG3RKM.png" class="card-img-top" alt="Mycelium Wallet" />
          <div class="car-body">
            <h5 class="car-title">Mycelium Wallet</h5>
            <p class="car-text">Mycelium is a mobile wallet known for its advanced features and support for Bitcoin. It is ideal for users seeking more control and customizable security settings.</p>
            <button class="btn-danger3" @click="toggleMyceliumDetails">{{ showMyceliumDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showMyceliumDetails" class="mt-3">
              <h6>How to Install Mycelium:</h6>
              <ol>
                <li>Download from the <a href="https://mycelium.com/" target="_blank">Mycelium website</a> or your mobile app store.</li>
                <li>Follow the setup process and secure your seed phrase.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Enable PIN protection and fingerprint ID if supported.</li>
                <li>Consider using a hardware wallet integration for added security.</li>
                <li>Never share your private keys or recovery phrase.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://atomicwallet.io/images/token/first-screen.png" class="card-img-top" alt="Exodus Wallet" />
          <div class="car-body">
            <h5 class="car-title">Atomic Wallet</h5>
            <p class="car-text">Atomic Wallet supports more than 300 currencies and tokens. The service offers not only a wallet for storage, but also the purchase and exchange of funds. To work with it, you can use a program for Windows, macOS and Linux, as well as a mobile application for iOS and Android.</p>
            <button class="btn-danger3" @click="toggleExodusDetails">{{ showExodusDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showExodusDetails" class="mt-3">
              <h6>How to Install Atomic Wallet:</h6>
              <ol>
                <li>Download from the <a href="https://atomicwallet.io/" target="_blank">Atomic Wallet</a>.</li>
                <li>Install the app on your computer or mobile device and complete the setup.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Keep your recovery phrase safe and offline.</li>
                <li>Enable security settings within the app for added protection.</li>
                <li>Use Atomic Wallet built-in backup options.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     
    </div>

    </div>

    <!-- Cold Wallets Section -->
    <h2 style="color: cornflowerblue;" class="fw-bold mt-5 text-center">Cold Wallets</h2>
    <div class="row">
      <!-- Ledger Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/03/swap-ledger-live.webp" class="card-img-top" alt="Ledger Wallet" />
          <div class="car-body">
            <h5 class="car-title">Ledger Wallet</h5>
            <p class="car-text">Ledger wallets are one of the most secure ways to store cryptocurrency offline. With models like Ledger Nano S and Nano X, users have cold storage options for a wide range of coins.</p>
            <button class="btn-danger3" @click="toggleLedgerDetails">{{ showLedgerDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showLedgerDetails" class="mt-3">
              <h6>How to Set Up Ledger:</h6>
              <ol>
                <li>Order from the official <a href="https://www.ledger.com/" target="_blank">Ledger website</a>.</li>
                <li>Connect via USB and set up using the Ledger Live software.</li>
                <li>Securely write down your recovery phrase and never share it.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Always buy from the official site to avoid counterfeit products.</li>
                <li>Keep your recovery phrase in a secure place offline.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Trezor Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://cryptoken.nl/wp-content/uploads/2024/08/TS5-Black-Graphite-1.png" class="card-img-top" alt="Trezor Wallet" />
          <div class="car-body">
            <h5 class="car-title">Trezor Wallet</h5>
            <p class="car-text">Trezor is another popular hardware wallet that supports a variety of cryptocurrencies, offering enhanced security for users looking for cold storage.</p>
            <button class="btn-danger3" @click="toggleTrezorDetails">{{ showTrezorDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showTrezorDetails" class="mt-3">
              <h6>How to Set Up Trezor:</h6>
              <ol>
                <li>Purchase from the <a href="https://trezor.io/" target="_blank">Trezor website</a> and connect via USB.</li>
                <li>Use Trezor Suite to initialize and secure the device.</li>
                <li>Store your recovery phrase offline and avoid sharing it.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Enable PIN and passphrase options for extra security.</li>
                <li>Avoid exposing your recovery phrase online.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
     
      <!-- SafePal Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://www.hardware-wallets.net/wp-content/uploads/2022/02/safepal.webp" class="card-img-top" alt="SafePal Wallet" />
          <div class="car-body">
            <h5 class="car-title">SafePal Wallet</h5>
            <p class="car-text">SafePal is a hardware wallet endorsed by Binance, known for its air-gapped security, QR-code transaction signing, and support for a wide range of cryptocurrencies.</p>
            <button class="btn-danger3" @click="toggleSafePalDetails">{{ showSafePalDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showSafePalDetails" class="mt-3">
              <h6>How to Use SafePal:</h6>
              <ol>
                <li>Order from <a href="https://www.safepal.com/" target="_blank">SafePal's website</a>.</li>
                <li>Initialize the device and install the SafePal app on your phone.</li>
                <li>Use QR code scanning for secure transactions.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Keep the wallet offline except when signing transactions.</li>
                <li>Use a strong PIN and never share your recovery phrase.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- KeepKey Wallet Card -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://www.crypto.ca/r/media/posts/11/keepkey01.png" class="card-img-top" alt="KeepKey Wallet" />
          <div class="car-body">
            <h5 class="car-title">KeepKey Wallet</h5>
            <p class="car-text">KeepKey is a secure hardware wallet with an easy-to-use interface, supporting Bitcoin, Ethereum, Litecoin, and other coins.</p>
            <button class="btn-danger3" @click="toggleKeepKeyDetails">{{ showKeepKeyDetails ? 'Hide' : 'Read More' }}</button>
            <div v-if="showKeepKeyDetails" class="mt-3">
              <h6>How to Use KeepKey:</h6>
              <ol>
                <li>Order from <a href="https://www.keepkey.com/" target="_blank">KeepKey’s official website</a>.</li>
                <li>Set up with a secure PIN and back up your recovery phrase.</li>
              </ol>
              <h6>Security Tips:</h6>
              <ul>
                <li>Store your recovery phrase offline securely.</li>
                <li>Use KeepKey with secure, trusted devices only.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
   

    </div>
  </div>
</template>

<script>
import articleWalletsVue from '../components/ArticleWallets.vue';

export default {
  components:{articleWalletsVue},
  data() {
    return {
      showTrustWalletDetails: false,
      showExodusDetails: false,
      showMyceliumDetails: false,
      showMetaMaskDetails: false,
      showElectrumDetails: false,
      showLedgerDetails: false,
      showTrezorDetails: false,
      showSafePalDetails: false,
      showKeepKeyDetails: false,
    };
  },
  methods: {
    toggleTrustWalletDetails() {
      this.showTrustWalletDetails = !this.showTrustWalletDetails;
    },
    toggleExodusDetails() {
      this.showExodusDetails = !this.showExodusDetails;
    },
    toggleMyceliumDetails() {
      this.showMyceliumDetails = !this.showMyceliumDetails;
    },
    toggleMetaMaskDetails() {
      this.showMetaMaskDetails = !this.showMetaMaskDetails;
    },
    toggleElectrumDetails() {
      this.showElectrumDetails = !this.showElectrumDetails;
    },
    toggleLedgerDetails() {
      this.showLedgerDetails = !this.showLedgerDetails;
    },
    toggleTrezorDetails() {
      this.showTrezorDetails = !this.showTrezorDetails;
    },
    toggleSafePalDetails() {
      this.showSafePalDetails = !this.showSafePalDetails;
    },
    toggleKeepKeyDetails() {
      this.showKeepKeyDetails = !this.showKeepKeyDetails;
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
.car-title{
  font-weight: bold;
}
.container {
  max-width: 1200px;
}
.car-text, .text, li, h6{
  color:  #6c757d;
}
.car {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  margin: 15px 0;
}

.car:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.car-body {
  padding: 20px;
}

.car img {
  height: 200px;
  object-fit: contain;
}

@media (min-width: 992px) {
  .row > .col-md-6:nth-child(odd) .card {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .car img {
    height: 150px;
  }
}
</style>

















