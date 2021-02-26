import firebase from 'firebase/app';
import 'firebase/firestore'
import firebaseConfig from './assets/data/firebase';

export default async function() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const db = firebase.firestore();
  let productPaths = [];
  let products = [];

  await db.collection('products').get().then(querySnapshot => {
    querySnapshot.docs.forEach(doc => {
      products.push(doc.data());
    });
  });

  products.forEach(product => {
    productPaths.push('/shop/' + product.slug);
    productPaths.push('/shop/reviews/' + product.id);
    productPaths.push('/dashboard/products/' + product.id);
  });

  return {
    /*
    ** Headers of the page
    */
    ssr: true,
    target: 'static',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'So Far So Bad - Ink Inspired, minimalist apparel',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'We strongly belive in the "Less is Better" rule so most of our designs are simple but bold.' },
        { name: 'keywords', content: 'fashion, clothes, apparel, tattoo, tattooed, ink, inked, tshirt, minimalist, design, shop, ecommerce, store' },
        { hid: 'twittercard', name: 'twitter:card', content: 'summary_large_image'},
        { hid: 'twittersite', name: 'twitter:site', content: '@sofarsobadapparel'},
        { hid: 'twittertitle', name: 'twitter:title', content: 'So Far So Bad - Ink Inspired, minimalist apparel'},
        { hid: 'twitterdesc', name: 'twitter:description', content: 'We strongly belive in the "Less is Better" rule so most of our designs are simple but bold.'},
        { hid: 'twitterimage', name: 'twitter:image', content: 'https://www.sofarsobad.co.uk/medusa.png'},
        { hid: 'ogtitle', property: 'og:title', content: 'So Far So Bad - Ink Inspired, minimalist apparel'},
        { hid: 'ogtype', property: 'og:type', content: 'Website'},
        { hid: 'ogurl', property: 'og:url', content: 'https://www.sofarsobad.co.uk'},
        { hid: 'ogdesc', property: 'og:description', content: 'We strongly belive in the "Less is Better" rule so most of our designs are simple but bold.'},
        { hid: 'ogimage', property: 'og:image', content: 'https://www.sofarsobad.co.uk/medusa.png'}
      ],
      script: [
        { hid: 'cookie-law', src: 'https://cdn.jsdelivr.net/npm/cookie-bar/cookiebar-latest.min.js?tracking=1&showNoConsent=1&noConfirm=1&hideDetailsBtn=1&showPolicyLink=1&privacyPage=https%3A%2F%2Fwww.sofarsobad.co.uk%2Flegal%2Fprivacy-policy', defer: true }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya:ital@1&display=swap'},
        { rel: 'canonical', href: 'https://www.sofarsobad.co.uk/'},
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'msapplication-TileColor', content: '#000000' },
        { rel: 'theme-color', content: '#000000'}
      ]
    },
    generate: {
      routes: [
        ...productPaths,
        '/shop',
        '/shop/checkout'
      ]
    },
    render: {
      static: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    },
    env: {
      PP_ENV: process.env.PP_ENV || 'sandbox',
      PP_CID: process.env.PP_CID || 'AVCPUdbSE9AnslA-M0LG1NR_gEkDi7u93rUVJzArKqVrjuIGOzfn-h-57wbOjAaJ9SBtIx2_o7C8tbiE',
      PP_CIDD: process.env.PP_CIDD || 'EJ_WMrJD3YXnobQpNc39C1n1xCJ2x5au4O1yxpz7WlwqRFtreyGdQxJR13dHMRD2boVuKdOanPAjQb-d',
      EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'service_c3r9jfb',
      EMAIL_USER: process.env.EMAIL_USER || 'user_SF617RJNGSX54dsuDaHHL',
      MAILCHIMP_API: process.env.MAILCHIMP_API || 'default',
      MAILCHIMP_UID: process.env.MAILCHIMP_UID || 'default',
      MAILCHIMP_LIST: process.env.MAILCHIMP_LIST || 'default',
      BUILD_HOOK: process.env.BUILD_HOOK || 'default',
      ANALYTICS: process.env.ANALYTICS || 'default',
      G_TAG: process.env.G_TAG || 'default'
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#000000' },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
      { src: '~/plugins/paypal.js', ssr: false },
      { src: '~/plugins/ga.js', mode: 'client' },
      { src: '~/plugins/jsonld.js' },
      { src: '~/plugins/vue-fb-customer-chat.js', mode: 'client', ssr: false }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
      '@aceforth/nuxt-optimized-images',
    ],
    optimizedImages: {
      optimizeImages: true
    },
    /*
    ** Nuxt.js modules
    */
    modules: [
      // Doc: https://buefy.github.io/#/documentation
      '@nuxtjs/style-resources',
      'nuxt-buefy',
      'nuxt-vuex-localstorage',
      '@nuxtjs/sitemap',
      'nuxt-compress'
    ],
    "nuxt-compress": {
      gzip: {
        cache: true
      },
      brotli: {
        threshold: 10240
      }
    },
    sitemap: {
      hostname: 'https://sofarsobad.co.uk',
      gzip: true,
      exclude: [
        '/dashboard/**',
        '/shop/checkout/complete'
      ],
      routes: [...productPaths]
    },
    styleResources: {
      scss: [
        'assets/scss/main.scss',
      ]
    },
    router: {
      middleware: 'index'
    },
    /*
    ** Build configuration
    */
    build: {
      transpile: [
        'nuxt-vuex-localstorage'
      ],
      maxChunkSize: 30000,
      /*
      ** You can extend webpack config here
      */
      extend (config, ctx) {
      }
    }
  }
}
