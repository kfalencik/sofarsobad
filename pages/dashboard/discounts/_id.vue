<template>
  <div v-if="discountCode">
    <h2>Discount code - {{ code }}</h2>

    <div class="content">
      <form class="form">

        <b-field message='Has to be unique. All in captial letters or numbers, no spaces or special characters."' class="form__input" label="Code">
          <b-input placeholder="Code" v-model="code" required></b-input>
        </b-field>

        <b-field message='For example: "Additional 10% off"' class="form__input" label="Description">
          <b-input placeholder="Description" v-model="title" required></b-input>
        </b-field>

        <b-field message='As a percentage, for example: "20"' class="form__input" label="Discount">
          <b-input placeholder="Discount" v-model="discount" required></b-input>
        </b-field>

        <b-field message="DD/MM/YYYY, for example: 20/04/2020. If no date set, it won't expire." class="form__input" label="Expiry Date">
          <b-input placeholder="Expiry Date" v-model="expiry"></b-input>
        </b-field>

        <div class="form__input form__input--buttons">
          <button type="button" @click.stop="editDiscountCode" class="button is-success">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      code: '',
      expiry: '',
      discount: 0
    }
  },
  layout: 'dashboard',
  computed: {
    id() {
      return this.$route.params.id;
    },
    discountCode() {
      let discount = this.$store.state.discounts.filter(discount => discount.id === parseInt(this.id));
      discount = discount[0];
      this.title = discount.title;
      this.discount = discount.discount;
      this.expiry = discount.expiry;
      this.code = discount.code;

      return discount;
    },
  },
  methods: {
    editDiscountCode: function() {
    if (
        this.title === '' ||
        this.code === '' ||
        this.discount === 0
      ) {
        this.$store.commit('addMessage', ['Please fill in all the required fields.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');
        
        this.$store.commit('editDiscountCode', [this.discountCode.id, {
          title: this.title,
          code: this.code,
          discount: this.discount,
          expiry: this.expiry,
        }]);

        this.$buefy.toast.open({message: 'Changes successfully saved!', type: 'is-success'});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .container {
        min-height: 60vh;
    }

    .form {
        &__input {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            max-width: 500px;

            label {
                font-weight: bold;
                font-size: 0.8em;
            }
        }

        &__input-description {
            font-size: 0.6em;
        }
    }
</style>
