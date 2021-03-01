<template>
  <div>
    <h2>Discount codes</h2>
    <router-link class="button is-black" to="/dashboard/discounts/add-code">Add a Discount Code</router-link>
    <b-table :data="discounts" :bordered="true" :striped="true" :narrowed="true" :current-page.sync="currentPage" :paginated="true" :per-page="20">
      <b-table-column field="id" label="ID" width="40" v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="code" label="Code" v-slot="props">
        {{ props.row.code }}
      </b-table-column>
      <b-table-column field="title" label="Description" v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="discount" label="Discount" width="100" v-slot="props">
        {{ props.row.discount }}%
      </b-table-column>
      <b-table-column field="link" label="Actions" width="120" v-slot="props">
        <router-link :to="props.row.editLink">Edit</router-link> | <a @click.stop="removeDiscountCode(props.row.id)">Remove</a>
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
    }
  },
  computed: {
    discounts() {
      let discounts = [...this.$store.state.discounts];
      let discountsData = discounts.sort((a, b) => (a.id > b.id) ? 1 : -1);

      discounts.forEach(discount => {
        discount.editLink = '/dashboard/discounts/' + discount.id;
      });

      return discountsData;
    }
  },
  methods: {
    removeDiscountCode: function(id) {
      this.$buefy.dialog.confirm({
        title: 'Are you sure?',
        message: 'You\'re about to permanently remove a discount code.',
        confirmText: 'Yes, remove code',
        type: 'is-danger',
        cancelText: 'Cancel',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('redirecting');
          this.$buefy.toast.open({message: 'Discount code has been removed!', type: 'is-success'});
          this.$store.commit('removeDiscountCode', id);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 15px 0 25px;
  }
</style>