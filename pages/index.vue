<template>
  <div>
    <HomeGrid />
    <New v-if="!loaded" number="8" />
    
    <!-- <New number="8" /> -->
    <!-- <Testimonials /> -->
  </div>
</template>

<script>
import HomeGrid from '~/components/HomeGrid';
import Popular from '~/components/Popular';
import Testimonials from '~/components/Testimonials';
import New from '~/components/New';
import Services from '~/components/Services';
import KeyPoints from '~/components/KeyPoints';
import LimitedEdition from '~/components/LimitedEditionSection';
import About from '~/components/About';

export default {

  head () {
    return {
      title: 'So Far So Bad',
    }
  },

  props: {
    loaded: {
      default: false,
      type: Boolean
    }
  },

  jsonld() {
    return {
      "@context" : "https://schema.org",
      "@type" : "Organization",
      "name" : "So Far So Bad",
      "legalName": "Smart Photos Studio LLC",
      "logo": "https://falencik.com/logo.png",
      "foundingDate": "2020",
      "url" : "https://falencik.com",
      "sameAs" : [
        "https://www.facebook.com/peterfalencik",
      ],
      "founders": [
        {
        "@type": "Person",
        "name": "Peter Falencik"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1280 WILDWOOD LAKES BLVD",
        "addressLocality": "Naples",
        "addressRegion": "FL",
        "postalCode": "34104",
        "addressCountry": "USA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": "[+1239-298-0887]",
        "email": "studio@falencik.com"
      }
    }
  },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },

  name: 'HomePage',

  transition: 'page',

  components: {
    Popular,
    Testimonials,
    New,
    Services,
    KeyPoints,
    LimitedEdition,
    About,
    HomeGrid
  },
}
</script>
