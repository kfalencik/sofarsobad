<template>
  <div class="section section--page">
    <div class="container">
      <div class="page-header">
        <h2>Shop</h2>
        <p>Discover our collection of tattoo inspired, minimalist designs. We know how much you love simple apparel with small but bold illustrations, so that's what we're striving to deliver.</p>
      </div>
      <!-- <div class="filters">
        <!-- <b-button icon-left="filter" @click="toggleFilters">Filters</b-button> -->
        <!-- <div></div>
        <b-field>
          <b-select placeholder="Sort by" v-model="sorter" @input="sortProducts($event)" expanded>
            <option value="popularity-az">Bestselling</option>
            <option value="price-za">Price, low to high</option>
            <option value="price-az">Price, high to low</option>
            <option value="date-az">Date, new to old</option>
            <option value="date-za">Date, Old to new</option>
          </b-select>
        </b-field>
      </div> -->
      <div class="columns is-mobile">
        <Products class="column" :products="products" />
      </div>
    </div>
    <!-- <b-sidebar
      :fullheight="true"
      v-model="openFilters"
    >
      <div class="p-4">
        <Filters class="column is-narrow" />
      </div>
    </b-sidebar> -->
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
      return this.$store.state.filteredProducts;
    },

    sorter: {
      set (sorter) {
        this.$store.commit('sortProducts', sorter);
      },
      get () {
        return this.$store.state.sorter;
      }
    },
  },

  mounted() {
    this.$store.commit('sortProducts');
  },

  methods: {
    toggleFilters () {
      this.openFilters = true
    },

    sortProducts: function(event) {
      this.$store.commit('sortProducts', this.sorter);
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
