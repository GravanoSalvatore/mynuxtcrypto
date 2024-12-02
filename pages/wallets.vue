<template>
  <div class="container"> 
  <div class=" mt-5">
    <articleWalletsVue/>
    <br/><br/>
    <!-- Article Heading -->
    <div class="text-center mb-5">
        <h2>Популярные криптовалютные кошельки: MetaMask, Electrum, Ledger и другие</h2>
        <p>Полное руководство по использованию, установке и обеспечению безопасности ваших криптовалютных кошельков.</p>
      </div>

    <!-- Hot Wallets Section -->
    <h2 class="fw-bold text-center text-danger">Hot Wallets</h2>
    <div class="row">
      <!-- MetaMask Wallet Card -->
      <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/640px-MetaMask_Fox.svg.png" class="card-img-top" alt="MetaMask Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек MetaMask</h5>
              <p class="car-text">MetaMask — это популярный Ethereum-кошелек, доступный в виде расширения для браузера. Он позволяет пользователям хранить, отправлять и получать Ethereum и токены ERC-20.</p>
              <button class="btn-danger3" @click="toggleMetaMaskDetails">{{ showMetaMaskDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showMetaMaskDetails" class="mt-3 text">
                <h6>Как установить MetaMask:</h6>
                <ol>
                  <li>Перейдите на <a href="https://metamask.io/" target="_blank">сайт MetaMask</a> и установите расширение для браузера.</li>
                  <li>Создайте надежный пароль и сохраните фразу для восстановления.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Используйте MetaMask только на защищенных устройствах.</li>
                  <li>Никогда не делитесь своей фразой для восстановления.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Карточка Electrum -->
        <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://play-lh.googleusercontent.com/2dEx8K8AnAa8L0xvwKDBQXA--DdTsCqxEJmNvG49KyO5x4YSgQFbZPGANdYYITHtIro" class="card-img-top" alt="Electrum Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек Electrum</h5>
              <p class="car-text">Electrum — это кошелек для Bitcoin, известный своей скоростью и безопасностью. Идеально подходит для пользователей, которым важна эффективность транзакций Bitcoin.</p>
              <button class="btn-danger3" @click="toggleElectrumDetails">{{ showElectrumDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showElectrumDetails" class="mt-3">
                <h6>Как установить Electrum:</h6>
                <ol>
                  <li>Перейдите на <a href="https://electrum.org/" target="_blank">сайт Electrum</a> и скачайте приложение.</li>
                  <li>Настройте с использованием надежного пароля и фразы восстановления.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Скачивайте только с официального сайта.</li>
                  <li>Храните фразу восстановления в автономном режиме.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Карточка Trust Wallet -->
        <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/trustwallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-crypto-coin-cryptocurrency-pack-logos-icons-8263882.png" class="card-img-top" alt="Trust Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек Trust Wallet</h5>
              <p class="car-text">Trust Wallet — это мобильный кошелек для iOS и Android, поддерживающий широкий спектр криптовалют. Он предоставляет пользователю полный контроль над приватными ключами.</p>
              <button class="btn-danger3" @click="toggleTrustWalletDetails">{{ showTrustWalletDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showTrustWalletDetails" class="mt-3">
                <h6>Как установить Trust Wallet:</h6>
                <ol>
                  <li>Скачайте с <a href="https://trustwallet.com/" target="_blank">сайта Trust Wallet</a> или из магазина приложений.</li>
                  <li>Следуйте инструкциям по настройке и сохраните фразу восстановления.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Установите надежный пароль для устройства и кошелька.</li>
                  <li>Регулярно обновляйте приложение для безопасности.</li>
                  <li>Будьте осторожны с подключаемыми dApps.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Карточка Exodus -->
        <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://zengo.com/wp-content/uploads/Exodus_200x200@x2-150x150@2x.png" class="card-img-top" alt="Exodus Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек Exodus</h5>
              <p class="car-text">Exodus — это кошелек для настольных и мобильных устройств, поддерживающий множество активов, с простым интерфейсом и встроенной функцией обмена.</p>
              <button class="btn-danger3" @click="toggleExodusDetails">{{ showExodusDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showExodusDetails" class="mt-3">
                <h6>Как установить Exodus:</h6>
                <ol>
                  <li>Скачайте с <a href="https://exodus.com/" target="_blank">сайта Exodus</a>.</li>
                  <li>Установите приложение и завершите настройку.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Храните фразу восстановления в безопасности.</li>
                  <li>Включите настройки безопасности в приложении.</li>
                  <li>Используйте встроенные функции резервного копирования.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      <!-- Mycelium Wallet Card -->
      <!-- Карточка Mycelium -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img style="border-radius:" src="https://www.coindesk.com/resizer/r0BEMkXQ81Cly-ZCUy9Q-qVlxTI=/567x425/filters:quality(80):format(jpg)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/CEAWF2LR4VF7FCTCALNHUG3RKM.png" class="card-img-top" alt="Кошелек Mycelium" />
          <div class="car-body">
            <h5 class="car-title">Кошелек Mycelium</h5>
            <p class="car-text">Mycelium — это мобильный кошелек, известный своими продвинутыми функциями и поддержкой Bitcoin. Идеально подходит для пользователей, которым нужен больший контроль и настраиваемые параметры безопасности.</p>
            <button class="btn-danger3" @click="toggleMyceliumDetails">{{ showMyceliumDetails ? 'Скрыть' : 'Читать далее' }}</button>
            <div v-if="showMyceliumDetails" class="mt-3">
              <h6>Как установить Mycelium:</h6>
              <ol>
                <li>Скачайте с <a href="https://mycelium.com/" target="_blank">сайта Mycelium</a> или из магазина приложений.</li>
                <li>Следуйте инструкциям по настройке и сохраните фразу восстановления.</li>
              </ol>
              <h6>Советы по безопасности:</h6>
              <ul>
                <li>Включите защиту PIN-кодом и отпечатком пальца, если поддерживается.</li>
                <li>Рассмотрите интеграцию с аппаратным кошельком для большей безопасности.</li>
                <li>Никогда не делитесь своими приватными ключами или фразой восстановления.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка Atomic Wallet -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://atomicwallet.io/images/token/first-screen.png" class="card-img-top" alt="Кошелек Atomic" />
          <div class="car-body">
            <h5 class="car-title">Кошелек Atomic</h5>
            <p class="car-text">Atomic Wallet поддерживает более 300 валют и токенов. Этот сервис предлагает не только кошелек для хранения, но и возможность покупки и обмена средств. Для работы с ним вы можете использовать программу для Windows, macOS и Linux, а также мобильное приложение для iOS и Android.</p>
            <button class="btn-danger3" @click="toggleExodusDetails">{{ showExodusDetails ? 'Скрыть' : 'Читать далее' }}</button>
            <div v-if="showExodusDetails" class="mt-3">
              <h6>Как установить Atomic Wallet:</h6>
              <ol>
                <li>Скачайте с <a href="https://atomicwallet.io/" target="_blank">сайта Atomic Wallet</a>.</li>
                <li>Установите приложение на компьютер или мобильное устройство и завершите настройку.</li>
              </ol>
              <h6>Советы по безопасности:</h6>
              <ul>
                <li>Храните фразу восстановления в безопасности и оффлайн.</li>
                <li>Включите настройки безопасности в приложении для дополнительной защиты.</li>
                <li>Используйте встроенные опции резервного копирования Atomic Wallet.</li>
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
    <!-- Раздел Холодных кошельков -->
    <h2 style="color: cornflowerblue;" class="fw-bold mt-5 text-center">Холодные кошельки</h2>
      <div class="row">
        <!-- Карточка Ledger -->
        <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/03/swap-ledger-live.webp" class="card-img-top" alt="Ledger Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек Ledger</h5>
              <p class="car-text">Ledger — это один из самых надежных способов хранения криптовалюты в оффлайн режиме, предлагающий модели Nano S и Nano X.</p>
              <button class="btn-danger3" @click="toggleLedgerDetails">{{ showLedgerDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showLedgerDetails" class="mt-3">
                <h6>Как настроить Ledger:</h6>
                <ol>
                  <li>Закажите с официального <a href="https://www.ledger.com/" target="_blank">сайта Ledger</a>.</li>
                  <li>Подключите через USB и настройте с помощью Ledger Live.</li>
                  <li>Запишите фразу восстановления и никому её не передавайте.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Покупайте только на официальном сайте.</li>
                  <li>Храните фразу восстановления в безопасности.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Карточка Trezor -->
        <div class="col-md-6 mb-4">
          <div class="car h-100">
            <img src="https://cryptoken.nl/wp-content/uploads/2024/08/TS5-Black-Graphite-1.png" class="card-img-top" alt="Trezor Wallet" />
            <div class="car-body">
              <h5 class="car-title">Кошелек Trezor</h5>
              <p class="car-text">Trezor — популярный аппаратный кошелек, поддерживающий широкий спектр криптовалют и обеспечивающий повышенную безопасность для пользователей, ищущих холодное хранение.</p>
              <button class="btn-danger3" @click="toggleTrezorDetails">{{ showTrezorDetails ? 'Скрыть' : 'Читать далее' }}</button>
              <div v-if="showTrezorDetails" class="mt-3">
                <h6>Как настроить Trezor:</h6>
                <ol>
                  <li>Закажите с официального <a href="https://trezor.io/" target="_blank">сайта Trezor</a>.</li>
                  <li>Подключите и настройте с помощью Trezor Suite.</li>
                  <li>Храните фразу восстановления в безопасности.</li>
                </ol>
                <h6>Советы по безопасности:</h6>
                <ul>
                  <li>Включите PIN и пароль для дополнительной защиты.</li>
                  <li>Храните фразу восстановления в оффлайн режиме.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>


      </div>
      
     
       <!-- Карточка SafePal -->
       <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://www.hardware-wallets.net/wp-content/uploads/2022/02/safepal.webp" class="card-img-top" alt="Кошелек SafePal" />
          <div class="car-body">
            <h5 class="car-title">Кошелек SafePal</h5>
            <p class="car-text">SafePal — это аппаратный кошелек, поддерживаемый Binance, известный своей безопасностью, функцией подписи транзакций с помощью QR-кодов и поддержкой множества криптовалют.</p>
            <button class="btn-danger3" @click="toggleSafePalDetails">{{ showSafePalDetails ? 'Скрыть' : 'Читать далее' }}</button>
            <div v-if="showSafePalDetails" class="mt-3">
              <h6>Как использовать SafePal:</h6>
              <ol>
                <li>Закажите на <a href="https://www.safepal.com/" target="_blank">официальном сайте SafePal</a>.</li>
                <li>Инициализируйте устройство и установите приложение SafePal на ваш телефон.</li>
                <li>Используйте сканирование QR-кодов для безопасных транзакций.</li>
              </ol>
              <h6>Советы по безопасности:</h6>
              <ul>
                <li>Держите кошелек в офлайне, за исключением подписания транзакций.</li>
                <li>Используйте надежный PIN-код и никогда не делитесь своей фразой восстановления.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка KeepKey -->
      <div class="col-md-6 mb-4">
        <div class="car h-100">
          <img src="https://www.crypto.ca/r/media/posts/11/keepkey01.png" class="card-img-top" alt="Кошелек KeepKey" />
          <div class="car-body">
            <h5 class="car-title">Кошелек KeepKey</h5>
            <p class="car-text">KeepKey — это безопасный аппаратный кошелек с простым в использовании интерфейсом, поддерживающий Bitcoin, Ethereum, Litecoin и другие монеты.</p>
            <button class="btn-danger3" @click="toggleKeepKeyDetails">{{ showKeepKeyDetails ? 'Скрыть' : 'Читать далее' }}</button>
            <div v-if="showKeepKeyDetails" class="mt-3">
              <h6>Как использовать KeepKey:</h6>
              <ol>
                <li>Закажите с <a href="https://www.keepkey.com/" target="_blank">официального сайта KeepKey</a>.</li>
                <li>Настройте с помощью надежного PIN-кода и сохраните фразу восстановления.</li>
              </ol>
              <h6>Советы по безопасности:</h6>
              <ul>
                <li>Храните фразу восстановления в надежном месте офлайн.</li>
                <li>Используйте KeepKey только с проверенными, безопасными устройствами.</li>
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

















