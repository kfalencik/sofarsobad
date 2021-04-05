<template>
  <div class="section section--page">
    <div class="container">
      <div class="page-header">
        <h2>Shop</h2>
        <p>Discover our collection of tattoo inspired, minimalist designs. We know how much you love simple apparel with small but bold illustrations, so that's what we're striving to deliver.</p>
      </div>
      <div class="columns is-mobile">
        <Products class="column" :products="products" />
      </div>
    </div>
  </div>
</template>

<script>
import Products from '~/components/Products';
import Filters from '~/components/Filters';

export default {
  head () {
    return {
      title: 'So Far So Bad - Shop',
    }
  },

  components: {
    Products,
    Filters
  },

  name: 'Shop',

  transition: 'page',

  data () {
    return {
      openFilters: false
    }
  },

  computed: {
    products() {
      return this.$store.state.filteredProducts.sort((a, b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    min-height: 60vh;

    .columns {
      @media (min-width: $large) {
        width: 100%;
      }
    }

    .filters {
      display: flex;
      justify-content: space-between;
      margin: 15px 0 35px;
    }
  }
</style>
