<template>
  <div>
    <h2>Products</h2>
    
    <div class="filters">
      <b-field grouped>
        <p class="control">
        <b-button 
          tag="router-link"
          type="is-dark"
          to="/dashboard/products/add-product"
        >
          Add a product
        </b-button>
        </p>

        <p class="control">
          <b-autocomplete
            v-model="filterName"
            placeholder="Search products..."
            :data="products"
            field="title"
            @input="filterByName"
          >
          </b-autocomplete>
        </p>
      </b-field>
    </div>

    <b-table :data="products" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <b-table-column field="id" label="ID" width="150" v-slot="props" sortable numeric>
        {{ props.row.slug }}
      </b-table-column>
      <b-table-column field="title" label="Product" v-slot="props" sortable>
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="price" label="Price" width="120" v-slot="props" sortable>
        {{ price(props.row.price) }}
      </b-table-column>
      <b-table-column field="discount" label="Discount" width="100" v-slot="props" sortable>
        <span v-if="props.row.discount > 0">{{ props.row.discount }}%</span>
      </b-table-column>
      <b-table-column field="bought" label="Sales Number" width="120" v-slot="props" numeric sortable>
        {{ parseInt(props.row.bought) }}
      </b-table-column>
      <b-table-column field="link" label="Actions" width="120" v-slot="props">
        <router-link :to="props.row.editLink">Edit</router-link> | <a @click.stop="removeProduct(props.row.id)">Remove</a>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      currentPage: 1,
      filterName: '',
      filterCategory: ''
    }
  },
  computed: {
    products() {
      let products = [...this.$store.state.filteredProducts];
      let productsData = products.sort((a, b) => (a.slug > b.slug) ? 1 : -1);

      products.forEach(product => {
        product.editLink = '/dashboard/products/' + product.id;
      });

      return productsData;
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    price: function(price) {
      return '£' + (Math.floor(price * 100) / 100).toFixed(2)
    },

    removeProduct: function(id) {
      this.$buefy.dialog.confirm({
        title: 'Are you sure?',
        message: 'You\'re about to permanently remove a product.',
        confirmText: 'Yes, remove the product',
        type: 'is-danger',
        cancelText: 'Cancel',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('redirecting');
          this.$buefy.toast.open({message: 'Product has been removed!', type: 'is-success'});
          this.$store.commit('removeProduct', id);
        }
      });
    },

    filterByCategory () {
      const data = this.$store.state.categories;
      const selectedCategory = data.filter((option) => option.title === this.filterCategory)[0]
      this.$store.commit('setFilterCategory', selectedCategory.slug)
      this.$store.commit('filterProducts')
    },

    filterByName () {
      this.$store.commit('setSearchKeyword', this.filterName)
      this.$store.commit('filterProducts')
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    margin: 15px 0 25px;
  }
</style>