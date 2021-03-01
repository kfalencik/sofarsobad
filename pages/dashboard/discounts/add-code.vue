<template>
  <div>
    <h2>Add a Discount Code</h2>

    <div class="content">
      <form class="form">

        <b-field message='Has to be unique. All in captial letters or numbers, no spaces or special characters.' class="form__input" label="Code">
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
          <button type="button" @click="addDiscountCode" class="button is-success">Add Discount Code</button>
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
      discount: 0,
      expiry: '',
      latestId: 0
    }
  },
  layout: 'dashboard',
  computed: {
    discounts() {
      return this.$store.state.discounts;
    }
  },
  methods: {
    addDiscountCode: function() {
      if (
        this.title === '' ||
        this.code === '' ||
        this.discount === 0
      ){
        this.$buefy.toast.open({message: 'Please fill in all the required fields.', type: 'is-danger'});
      } else {
        this.$store.dispatch('redirecting');
        
        this.discounts.forEach(discount => {
          if (parseInt(discount.id) > this.latestId) {
            this.latestId = discount.id;
          }
        })

        this.latestId = this.latestId + 1;

        this.$store.commit('addDiscountCode', {
          id: this.latestId,
          title: this.title,
          code: this.code,
          discount: this.discount,
          expiry: this.expiry,
        });

        this.$buefy.toast.open({message: 'Discount Code successfully added!', type: 'is-success'});
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
