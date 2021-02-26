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
      "legalName": "So Far So Bad",
      "logo": "https://sofarsobad.co.uk/logo-white.png",
      "foundingDate": "2021",
      "url" : "https://sofarsobad.co.uk",
      "sameAs" : [
        "https://www.facebook.com/sofarsobadapparel",
      ],
      "founders": [
        {
        "@type": "Person",
        "name": "Kevin Falencik"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "67/2 Lorne Street",
        "addressLocality": "Edinburgh",
        "addressRegion": "Midlothian",
        "postalCode": "EH6 8QG",
        "addressCountry": "United Kingdom"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": "[+447961276427]",
        "email": "hi@sofarsobad.co.uk"
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
