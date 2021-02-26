<template>
  <div class="section">
    <div class="container">
      <h2>
        <router-link to="/shop">Newest designs</router-link>
      </h2>
      <Loading v-if="!loaded" />
      <Products v-else :products="products" />

      <div class="has-text-centered">
        <b-button to="/shop" tag="router-link" class="is-black">Explore More</b-button>
      </div>
    </div>
  </div>

</template>

<script>
import Products from './Products';
import Loading from './Loading';

export default {
  props: ['number', 'loaded'],
  computed: {
    products() {
      let productsArray = [...this.$store.state.products];
      let products = productsArray.sort((a, b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
      products = products.slice(0, this.number);
      return products;
    }
  },
  components: {
    Products,
    Loading
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin-bottom: 25px;

    h2 {
      margin-top: 0;
      text-align: center;

      a {
        color: $black;
      }
    }

    .is-tertiary {
      background-color: $tertiary;
      color: $black;
    }

    .has-text-centered {
      margin-top: 2em;
    }
  }
</style>
