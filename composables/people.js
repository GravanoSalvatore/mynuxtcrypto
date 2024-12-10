import { ref, computed } from 'vue';

export function useNews3() {
  const articles = ref( 
     [
        {
          "firstName": "Satoshi",
          "lastName": "Nakamoto",
          "bio": "Satoshi Nakamoto is the pseudonym used by the anonymous creator of Bitcoin, the world's first decentralized cryptocurrency. In 2008, Nakamoto published a paper describing Bitcoin as an electronic cash system based on blockchain technology. This technology enabled transactions without intermediaries such as banks or governments. Soon after, in 2009, Nakamoto launched the first version of the Bitcoin network and created the initial coins. His identity remains a mystery, but his invention revolutionized the world of finance and inspired the creation of thousands of other cryptocurrencies. Bitcoin has become a symbol of financial freedom, challenging the traditional banking system by offering a decentralized way of storing and transferring funds.",
          "image": "/naka.jpg"
        },
        {
          "firstName": "Vitalik",
          "lastName": "Buterin",
          "bio": "Vitalik Buterin is a Russian-Canadian programmer known as the creator of Ethereum, a blockchain-based platform for decentralized applications. Inspired by Bitcoin's possibilities, Buterin proposed a more flexible platform in 2013 that could support smart contracts. His idea enabled programmable automation of financial operations, making Ethereum not only a cryptocurrency but also a key infrastructure for decentralized finance and applications. Born in Russia and later moving to Canada, Buterin showed an early interest in programming, eventually leading to the creation of Ethereum. He is actively involved in the platform's development and the promotion of decentralization, believing that the future of finance and governance should be free from centralized control. Thanks to his contributions, Ethereum has become the second most important cryptocurrency after Bitcoin, and Buterin himself is one of the most influential figures in the crypto world.",
          "image": "/but.webp"
        },
        {
          "firstName": "Justin",
          "lastName": "Sun",
          "bio": "Justin Sun is the founder and CEO of TRON, a blockchain platform designed for creating decentralized applications (DApps) and digital entertainment. Inspired by blockchain’s potential, Sun launched TRON in 2017 to provide users with a global infrastructure for storing and sharing digital content without intermediaries. Sun is also known for his involvement in BitTorrent, which TRON acquired in 2018 to integrate decentralized file-sharing technology into its ecosystem. An ambitious entrepreneur, Sun actively supports the development of blockchain and cryptocurrency industries, advocating for internet freedom and decentralized media.",
          "image": "/sun.jpg"
        },
        {
          "firstName": "Changpeng",
          "lastName": "Zhao",
          "bio": "Changpeng Zhao, also known as CZ, is the founder and CEO of Binance, one of the world's largest cryptocurrency exchanges. Born in China and emigrating to Canada as a teenager, Zhao studied programming and quickly advanced in the financial and technology sectors. In 2017, he launched Binance, giving users worldwide access to cryptocurrency exchange. Binance has grown into a significant ecosystem, encompassing not only exchange services but also research, blockchain innovation, and charity. Zhao actively promotes blockchain and cryptocurrencies, viewing them as a means to achieve financial independence and transparency. He also supports the adoption of blockchain technologies in emerging markets, offering them access to modern financial services.",
          "image": "/chan.jpg"
        },
        {
          "firstName": "Elizabeth",
          "lastName": "Stark",
          "bio": "Elizabeth Stark is a prominent figure in the cryptocurrency and blockchain world, serving as the CEO and co-founder of Lightning Labs. Stark works on advancing the Lightning Network technology, which enables fast and inexpensive transactions on the Bitcoin network. She believes decentralized technologies can transform financial infrastructure, making it accessible and efficient for everyone. Stark also actively supports decentralized finance and conducts educational programs to help people understand blockchain and cryptocurrency potential. Thanks to her efforts, Lightning Labs has become a leading developer of second-layer Bitcoin technologies, allowing the network to handle millions of transactions per second. Her work has significantly contributed to Bitcoin’s adaptation for real-world applications like micropayments and retail transactions.",
          "image": "/stark.jpg"
        },
        {
          "firstName": "Jack",
          "lastName": "Dorsey",
          "bio": "Jack Dorsey, known as the founder of Twitter and Square (now Block), has also become an active supporter of cryptocurrencies and blockchain technology. Recently, Dorsey has focused on supporting Bitcoin, believing it could become the 'currency of the internet.' His company Block has invested in Bitcoin-related development and offers users a platform for buying and storing cryptocurrency. Dorsey organizes various events to promote decentralization and financial freedom. In public speeches, he has emphasized the importance of independent financial systems and initiatives aimed at global financial inclusion. His ideas and actions contribute to the growth of the crypto industry and the popularization of Bitcoin among the general public.",
          "image": "dorsy.webp"
        },
        {
          "firstName": "Charlie",
          "lastName": "Lee",
          "bio": "Charlie Lee is the creator of Litecoin, one of the most well-known alternative cryptocurrencies. Launched in 2011, Litecoin was one of the first attempts to improve Bitcoin by making transactions faster and cheaper. Born in Côte d'Ivoire and moving to the United States, Lee graduated from the Massachusetts Institute of Technology. With a background in Google, he developed Litecoin using Bitcoin's codebase but introduced changes that allowed the network to process transactions four times faster. Lee actively promotes cryptocurrencies, advocating for an open and decentralized financial system. His project has become a significant part of the cryptocurrency market, with Litecoin used as a faster, cheaper alternative to Bitcoin for daily transactions.",
          "image": "https://happycoin.club/wp-content/uploads/2023/05/charli-li-kriptovalyuta-lajtkoin-litecoin-ltc.jpg"
        },
        {
          "firstName": "Brad",
          "lastName": "Garlinghouse",
          "bio": "Brad Garlinghouse is the CEO of Ripple Labs, the company behind the RippleNet payment system and XRP cryptocurrency. Garlinghouse started his career in the traditional finance sector and joined Ripple to create a system for fast and inexpensive cross-border payments. Ripple partners with banks and financial institutions to expedite international transfers and reduce their cost. Despite legal issues with the SEC, Garlinghouse continues to promote XRP and work on the future of financial services. His work with Ripple aims to bridge the world of cryptocurrencies and traditional banking, providing users with convenient tools for cross-border transactions.",
          "image": "https://hashtelegraph.com/wp-content/uploads/2019/08/Brad-Garlinghouse3.jpg"
        },
        {
          "firstName": "Ada",
          "lastName": "Lovelace",
          "bio": "Ada Lovelace was one of the first female programmers, collaborating with Charles Babbage on the analytical engine, a precursor to modern computers. Although not directly linked to the world of cryptocurrencies, she is often considered a foremother of the ideas that underpin computer technology and cryptography. Lovelace anticipated the potential of machines for processing information and performing algorithmic tasks, which is fundamental to modern blockchain technology and cryptographic methods used for securing data and conducting financial transactions.",
          "image": "https://api.psychologos.ru/storage/image/zcMQqitYUG93NDfuUYIt8GpGuBX9sbTawMbR5SA5.png"
        },
        {
          "firstName": "Nick",
          "lastName": "Szabo",
          "bio": "Nick Szabo is a pioneer in the world of blockchain and cryptocurrency, known for his contributions to the development of smart contracts. In 1994, Szabo proposed the concept of smart contracts that automate the fulfillment of agreements without third parties. His idea laid the foundation for many modern decentralized applications, used in systems like Ethereum. Additionally, he created BitGold, a concept that anticipated Bitcoin with its properties of decentralization and security. Szabo actively advocates for decentralized technologies and their role in ensuring financial and information security, and his work is a cornerstone in the blockchain world.",
          "image": "https://habrastorage.org/getpro/habr/upload_files/74f/8bd/3f5/74f8bd3f5836d7bb8e6cb03147106f30.jpg"
        },
        {
          "firstName": "Tim",
          "lastName": "Draper",
          "bio": "Tim Draper is an American venture capitalist known for his early investment in Bitcoin and support for the cryptocurrency sector. He founded Draper University and Draper Fisher Jurvetson (DFJ), one of the first Silicon Valley venture funds investing in tech startups. Draper drew public attention after purchasing 30,000 Bitcoins at a government auction, fueling his support for cryptocurrencies. He actively advocates for free markets and the use of blockchain in government services, believing decentralization can improve governance. In 2014, Draper predicted Bitcoin would reach $10,000, which came true. Besides cryptocurrencies, he invests in projects focusing on AI, blockchain, and education platforms.",
          "image": "https://bits.media/upload/iblock/c5c/otcf7ynjdupc59kyp787t7yhhomkbd4b/tim_dreyper_rekomenduet_vkladyvatsya_minimum_v_dve_kriptovalyuty.png"
        },
        {
          "firstName": "Brian",
          "lastName": "Armstrong",
          "bio": "Brian Armstrong is an American entrepreneur and co-founder of the cryptocurrency platform Coinbase. In 2012, seeing the potential of Bitcoin and blockchain, he launched Coinbase with Fred Ehrsam to make cryptocurrency trading accessible to the public. Armstrong is a proponent of financial freedom, financial democratization, and creating accessible cryptocurrency exchange platforms. Under his leadership, Coinbase became one of the largest cryptocurrency exchanges globally, obtaining regulatory approvals in various countries. Armstrong also supports decentralized finance projects, cryptocurrency adoption in traditional economies, and access to technologies in underserved regions.",
          "image": "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/OVL6FUEJRNG3TB3MXQJJJQ45CU.jpeg"
        },
        {
          "firstName": "Roger",
          "lastName": "Ver",
          "bio": "Roger Ver, also known as 'Bitcoin Jesus,' is one of the early investors and proponents of Bitcoin. He founded Bitcoin.com and actively promotes using Bitcoin and other cryptocurrencies for free and anonymous transactions. Ver is known for his belief in financial freedom and decentralization, asserting that cryptocurrencies help people avoid government control over their finances. In the early 2010s, he invested in companies like Ripple and Kraken, helping to shape the modern cryptocurrency market. In 2017, Ver supported Bitcoin Cash, a fork of Bitcoin, arguing it better serves Bitcoin's original mission as digital money.",
          "image": "https://bits.media/upload/iblock/26d/1ob7wvxputkc1zcflhplt4w4a7rgefc5/osnovatel_bitcoin_com_rodzher_ver_osvobozhden_pod_zalog_iz_ispanskoy_tyurmy.jpg"
        },
        {
          "firstName": "Cathie",
          "lastName": "Wood",
          "bio": "Cathie Wood is an American investor and the founder of ARK Invest, a company known for its investments in innovative technologies, including cryptocurrencies. Wood predicted significant Bitcoin growth and actively invested in crypto companies through ARK funds. Her strategic approach combines macroeconomic and technology analysis, making her a popular figure in finance. Wood focuses on long-term perspectives and innovations, such as blockchain, artificial intelligence, and biotechnology. She believes cryptocurrencies play an essential role in the digital transformation of the global economy.",
          "image": "https://inventure.com.ua/img/thumb.990.660/upload/pic2022-1H/im-317329.jpg"
        },
        {
          "firstName": "Joseph",
          "lastName": "Lubin",
          "bio": "Joseph Lubin is a Canadian entrepreneur and co-founder of Ethereum, as well as the founder of ConsenSys, a company developing solutions based on Ethereum and blockchain. Impressed by blockchain potential, he joined Vitalik Buterin in 2014 to develop Ethereum. Lubin played a crucial role in establishing Ethereum as a platform for creating decentralized applications and smart contracts, facilitating its use in various industries, including finance and healthcare. ConsenSys develops software and infrastructure needed for Ethereum ecosystem growth and has attracted substantial investment from financial institutions.",
          "image": "https://s3.eu-central-1.amazonaws.com/gncrypto.news/7djsqLdp8r2ScMHO2tVwtX5MGR2jXWVjHRIHfgCu.jpg"
        },
        {
          "firstName": "Gavin",
          "lastName": "Wood",
          "bio": "Gavin Wood is a British programmer and one of the co-founders of Ethereum. He authored the Solidity programming language, which forms the basis for writing smart contracts on Ethereum. Wood is also known as the founder of Polkadot, a platform designed to connect various blockchains. His work on Ethereum and Polkadot has made him a key figure in blockchain technology. Wood believes decentralized systems can create a fairer society and expand opportunities for people worldwide.",
          "image": "https://bits.media/upload/resize_cache/webp/iblock/0a1/w5m3h52jbwbygbgipa2ecgxuw1ik8tu0/gevin_vud_pokidaet_post_generalnogo_direktora_parity_technologies.webp"
        },
        {
          "firstName": "Cameron",
          "lastName": "Winklevoss",
          "bio": "Cameron Winklevoss is an American entrepreneur, one of the Winklevoss twins, known for their early investment in Bitcoin and founding the cryptocurrency exchange Gemini. Cameron and his brother Tyler were among the first public figures to support Bitcoin when its price was under $10. Gemini, founded by them in 2014, became one of the first regulated exchanges in the United States and quickly gained popularity among institutional investors.",
          "image": "https://cs14.pikabu.ru/post_img/big/2024/01/18/7/1705575323256913065.png"
        },
        {
          "firstName": "Tyler",
          "lastName": "Winklevoss",
          "bio": "Tyler Winklevoss, the brother of Cameron Winklevoss, is the co-founder of the Gemini cryptocurrency exchange and one of the first well-known investors in Bitcoin. After their legal dispute with Facebook, the brothers decided to invest in cryptocurrencies, acquiring a substantial amount of Bitcoin. Gemini was one of the first cryptocurrency exchanges to receive full regulatory approval in the US, aiming to provide a reliable and secure platform for trading digital assets.",
          "image": "https://hashtelegraph.com/wp-content/uploads/2021/04/Tyler-Winklevoss-1024x576.jpg"
        },
        {
          "firstName": "Anthony",
          "lastName": "Pompliano",
          "bio": "Anthony Pompliano, known as 'Pomp,' is a well-known American investor, Bitcoin advocate, and host of a popular cryptocurrency podcast. Starting his career in the tech sector and serving in the army, Pompliano co-founded Morgan Creek Digital in 2016, a company investing in digital assets.",
          "image": "https://hashtelegraph.com/wp-content/uploads/2024/05/Anthony-Pompliano.jpg"
        },
        {
          "firstName": "Sam",
          "lastName": "Bankman-Fried",
          "bio": "Sam Bankman-Fried is an American entrepreneur and the founder of FTX, one of the world's largest cryptocurrency exchanges. Bankman-Fried founded FTX in 2017, aiming to create a user-friendly and secure platform for cryptocurrency trading. FTX quickly gained popularity with its innovative products and robust infrastructure that allows users to trade various digital assets. Bankman-Fried is also involved in philanthropy.",
          "image": "https://ixbt.online/live/images/original/00/06/21/2024/09/15/f9df533ab1.png"
        },
        {
          "firstName": "Chris",
          "lastName": "Larsen",
          "bio": "Chris Larsen is the co-founder and chairman of Ripple Labs, a company developing blockchain-based payment solutions for banks. Larsen is known for his efforts to speed up transactions and reduce costs in the banking industry.",
          "image": "https://static.news.bitcoin.com/wp-content/uploads/2024/01/ripps.jpg"
        },
        {
          "firstName": "Michael",
          "lastName": "Saylor",
          "bio": "Michael Saylor is the CEO of MicroStrategy, known for his decisive approach to Bitcoin investment. In 2020, his company acquired substantial amounts of Bitcoin, viewing it as a strategic asset for inflation protection. Saylor believes Bitcoin is a unique digital asset free from inflation and that it will play an important role in the global financial system.",
          "image": "https://bits.media/upload/resize_cache/webp/iblock/500/p2pxon3qv2vs8pcy1f21lgln7hc5ychj/maykl_seylor_nasha_strategiya_sdelat_bitkoin_eshche_bolee_defitsitnym.webp"
        },
        {
          "firstName": "Mike",
          "lastName": "Novogratz",
          "bio": "Mike Novogratz is the founder and CEO of Galaxy Digital, an investment firm focused on blockchain and cryptocurrencies. He began his career in traditional finance and was a successful investor before turning to Bitcoin and Ethereum.",
          "image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Michael_Novogratz.jpg"
        },
        {
          "firstName": "Charles",
          "lastName": "Hoskinson",
          "bio": "Charles Hoskinson is the founder of Cardano and co-founder of Ethereum. Hoskinson played a key role in developing the first version of Ethereum, then founded Cardano, a third-generation blockchain.",
          "image": "https://bitexpert.io/wp-content/uploads/2024/06/izobrazhenie_2024-06-17_150034808.png"
        },
        {
          "firstName": "Alex",
          "lastName": "Mashinsky",
          "bio": "Alex Mashinsky is the founder of Celsius Network, a platform offering cryptocurrency lending and storage. Mashinsky is also known as one of the inventors of VoIP technology, used today for internet voice calls.",
          "image": "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/O5ZZBESUQNGGJDPVKDN6GDELBI.jpg"
        },
        {
          "firstName": "Anatoly",
          "lastName": "Yakovenko",
          "bio": "Anatoly Yakovenko is one of the founders of Solana, a blockchain platform focused on high speed and low transaction costs.",
          "image": "https://bits.media/upload/iblock/479/wa1wj0p60373srtyy8ydirey6tdxdsm8/gendirektor_solana_anatoliy_yakovenko_podelilsya_vospominaniyami_o_kollapse_kriptobirzhi_ftx.jpg"
        },
        {
          "firstName": "Jed",
          "lastName": "McCaleb",
          "bio": "Jed McCaleb is the co-founder of Stellar, a blockchain platform created to facilitate international money transfers.",
          "image": "https://noworries.news/wp-content/uploads/2022/07/bez-nazvanyya-1.jpg"
        },
        {
          "firstName": "Dan",
          "lastName": "Larimer",
          "bio": "Dan Larimer is the creator of EOS, a platform for developing decentralized applications.",
          "image": "https://bits.media/upload/resize_cache/webp/iblock/e15/daniel_larimer_anonsiroval_novyy_b2b_proekt_bez_tokenov_na_baze_eos_io.webp"
        },
        {
          "firstName": "Sergey",
          "lastName": "Nazarov",
          "bio": "Sergey Nazarov is the co-founder and CEO of Chainlink, a platform that provides a connection between smart contracts and real-world data.",
          "image": "https://hashtelegraph.com/wp-content/uploads/2023/09/Sergey-Nazarov-1024x576.jpg"
        },
        {
          "firstName": "Hayden",
          "lastName": "Adams",
          "bio": "Hayden Adams is the creator of Uniswap, a decentralized exchange based on Ethereum.",
          "image": "https://www.cryptotimes.io/wp-content/uploads/2024/09/Hayden-Adams-Denies-Uniswap-Charged-for-Protocol-Deployment.png"
        }
      ]
);

  const visibleArticlesCount = ref(8);
  const selectedArticle = ref(null);
  const latestNews = ref([]);
  const latestNews2 = ref([]);
  const sliderIndex = ref(0);
  const slideSize = 2;

  const visibleArticles = computed(() =>
    articles.value.slice(0, visibleArticlesCount.value)
  );

  const currentSlideArticles = computed(() => {
    const startIndex = sliderIndex.value * slideSize;
    return latestNews2.value.slice(startIndex, startIndex + slideSize);
  });

  const fetchLatestNews = async () => {
    try {
      const response = await fetch(
         "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
      );
      const data = await response.json();
      latestNews.value = data?.Data || [];
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
    }
  };
  
  const fetchSliderNews = async () => {
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?categories=ADA,XRP,XLM,TRX,SHIBA,DOGE,EOS,LTC,USDT,&excludeCategories=Sponsored"
      );
      const data = await response.json();
      latestNews2.value = data?.Data || [];
    } catch (error) {
      console.error("Ошибка при загрузке слайдера:", error);
    }
  };
  

  const loadMoreArticles = () => {
    visibleArticlesCount.value += 8;
  };

  const hideArticles = () => {
    if (visibleArticlesCount.value > 8) {
      visibleArticlesCount.value -= 8;
    }
  };

  const selectArticle = (index) => {
    if (index >= 0 && index < articles.value.length) {
      selectedArticle.value = articles.value[index];
    } else {
      console.warn("Invalid article index:", index);
    }
  };
  

  const clearSelection = () => {
    selectedArticle.value = null;
  };

  const nextSlide = () => {
    if (
      latestNews2.value &&
      (sliderIndex.value + 1) * slideSize < latestNews2.value.length
    ) {
      sliderIndex.value++;
    }
  };

  const previousSlide = () => {
    if (sliderIndex.value > 0) {
      sliderIndex.value--;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    articles,
    visibleArticlesCount,
    visibleArticles,
    selectedArticle,
    latestNews,
    latestNews2,
    sliderIndex,
    currentSlideArticles,
    fetchLatestNews,
    fetchSliderNews,
    loadMoreArticles,
    hideArticles,
    selectArticle,
    clearSelection,
    nextSlide,
    previousSlide,
    formatDate,
  };
}
