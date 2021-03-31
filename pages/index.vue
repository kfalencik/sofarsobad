<template>
  <div>
    <HomeGrid />
    <New :loaded="!loaded" number="8" />
  </div>
</template>

<script>
import HomeGrid from '~/components/HomeGrid';
import New from '~/components/New';

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
      "@type" : "Store",
      "@id": "https://sofarsobad.co.uk",
      "name" : "So Far So Bad",
      "legalName": "So Far So Bad",
      "logo": "https://sofarsobad.co.uk/logo.jpg",
      "foundingDate": "2021",
      "image" : "https://sofarsobad.co.uk/logo.jpg",
      "url" : "https://sofarsobad.co.uk",
      "priceRange": "$$",
      "sameAs" : [
        "https://facebook.com/sofarsobadapparel",
      ],
      "telephone": "+447961276427",
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
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "00:00",
          "closes": "23:59"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "00:00",
          "closes": "00:00"
        }
      ]
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
    New,
    HomeGrid
  },
}
</script>
