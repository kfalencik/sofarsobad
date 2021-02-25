import firebase from 'firebase/app';
import 'firebase/firestore'
import firebaseConfig from './assets/data/firebase';

export default async function() {
  firebase.initializeApp(firebaseConfig);
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

  console.log(products)

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
        { hid: 'twitterimage', name: 'twitter:image', content: 'https://d33wubrfki0l68.cloudfront.net/c65ae7c78c877a2b79ca8c12efc08fbfdf7e6409/32cd5/_nuxt/img/7aadeb4.png'},
        { hid: 'ogtitle', property: 'og:title', content: 'So Far So Bad - Ink Inspired, minimalist apparel'},
        { hid: 'ogtype', property: 'og:type', content: 'Website'},
        { hid: 'ogurl', property: 'og:url', content: 'https://www.sofarsobad.co.uk'},
        { hid: 'ogdesc', property: 'og:description', content: 'We strongly belive in the "Less is Better" rule so most of our designs are simple but bold.'},
        { hid: 'ogimage', property: 'og:image', content: 'https://d33wubrfki0l68.cloudfront.net/c65ae7c78c877a2b79ca8c12efc08fbfdf7e6409/32cd5/_nuxt/img/7aadeb4.png'}
      ],
      link: [
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
      crawler: true,
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
      PP_CID: process.env.PP_CID || 'AVW9mgQzfnpBUadBxQzNesRvzoMrb3YrnVZtwmaAgSUkdJHHY_uxRkfeMvZXeFrZYKXXUF1eop7pocXY',
      PP_CIDD: process.env.PP_CIDD || 'AVW9mgQzfnpBUadBxQzNesRvzoMrb3YrnVZtwmaAgSUkdJHHY_uxRkfeMvZXeFrZYKXXUF1eop7pocXY',
      EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'default_service',
      EMAIL_USER: process.env.EMAIL_USER || 'user_10niH9eYCXacdIs7NmDIs',
      MAILCHIMP_API: process.env.MAILCHIMP_API || 'default',
      MAILCHIMP_UID: process.env.MAILCHIMP_UID || 'default',
      MAILCHIMP_LIST: process.env.MAILCHIMP_LIST || 'default',
      BUILD_HOOK: process.env.BUILD_HOOK || 'default',
      ANALYTICS: process.env.ANALYTICS || 'default'
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
