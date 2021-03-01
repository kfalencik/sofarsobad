<template>
  <div class="product column is-full-mobile is-half-tablet is-half-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
    <div class="card">
      <router-link :to="'/shop/' + product.slug">
        <div class="product__discount-badge" v-if="product.discount && product.discount !== '0'">
          -{{ product.discount }}%
        </div>
        <div class="product__image">
          <div>
            <img :src="product.image1" :alt="product.title" loading="lazy" />
          </div>
        </div>
        <div class="product__title">
          {{ product.title }}
          <div class="product__price">
            <template v-if="product.discount && product.discount !== '0'">
              <span class="discount">{{ price(product.price) }}</span>
              <span class="price">£{{ discount(product.price, product.discount) }}</span>
            </template>
            <template v-else>
              <span class="price">{{ price(product.price) }}</span>
            </template>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'id'
  ],
  computed: {
    product() {
      return this.$store.state.products.find(product => product.id === this.id);
    },
  },
  methods: {
    discount: function(price, discount) {
      price = parseFloat(price)
      price = (price - ((price / 100) * discount))
      return price;
    },
    price: function(price) {
      price = parseFloat(price)
      return '£' + (Math.floor(price * 100) / 100).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: none;
  }

  .product {
    text-align: center;

    &__discount-badge {
      background: $tertiary;
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 28px;
      position: absolute;
      font-size: 1.2em;
      padding: 10px;
      color: $white;
      z-index: 10;
    }

    &__image {
      overflow: hidden;
      height: 350px;
      text-align: center;

      div {
        transform-origin: 235px 70px;
        transition: all .4s ease;
        height: 350px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    a:hover {
      .product__image div{
        transform: scale(3);
      }
    }

    &__title {
      padding: 10px 0 5px;
      font-size: 1.2em;
      min-height: 35px;
      color: $white;
      background: $black;
    }

    &__price {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .discount {
        color: $red;
        font-size: 0.8em;
        text-decoration: line-through;
        margin-right: 10px;
      }
    }
  }

</style>
