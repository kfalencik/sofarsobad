<template>
  <div v-if="product && product.title">
      <div class="section section--page">
        <div class="product container">
          <template v-if="overlay">
            <div class="product__overlay" @click="overlay = false">
              <img v-for="(item, index) in productImages" :src="item" :key="`overlay-image-${index}`" role="presentation" alt="" v-show="image === index + 1" />

              <button @click.prevent.stop="image === 1 ? image = productImages.length : image = image - 1" class="product__overlay-nav-item" title="Previous">
                <b-icon icon="arrow-left"></b-icon>
              </button>
              <button @click.prevent.stop="image === productImages.length ? image = 1 : image = image + 1" class="product__overlay-nav-item" title="Next">
                <b-icon icon="arrow-right"></b-icon>
              </button>

              <button class="close" @click="overlay = false" title="Close">
                <b-icon icon="close"></b-icon>
              </button>
            </div>
          </template>

          <div class="columns is-4 mt-4">
            <div class="column is-two-thirds">
              <router-link to="/shop"><b-icon icon="chevron-left" size="is-small"></b-icon>Back to shop</router-link>
            </div>
            <div class="column is-one-third">
              <div class="product__navigation has-text-right">
                <span @click="nextProduct('next')"><b-icon icon="chevron-left" size="is-small"></b-icon> Previous Product</span>
                &nbsp; &nbsp; &nbsp;
                <span @click="nextProduct('prev')">Next Product <b-icon icon="chevron-right" size="is-small"></b-icon></span>
              </div>
            </div>
          </div>

          <div class="columns is-4">
            <div class="column is-two-thirds">
              <div class="product__image">
                <img v-for="(item, index) in productImages" :src="item" :key="`product-image-${index}`" v-show="image === index + 1" role="presentation" alt="" />

                <button @click="overlay = true" class="product__image-fullscreen" title="Full screen">
                  <b-icon icon="fullscreen"></b-icon>
                </button>
                <button @click="image === productImages.length ? image = 1 : image = image + 1" class="product__nav-item" title="Next">
                  <b-icon icon="arrow-right"></b-icon>
                </button>
                <button @click="image === 1 ? image = productImages.length : image = image - 1" class="product__nav-item" title="Previous">
                  <b-icon icon="arrow-left"></b-icon>
                </button>
              </div>

              <div class="product__thumbnails"> 
                <div v-for="(item, index) in productImages" :key="`thumbnail-image-${index}`" class="product__thumbnails-item" @click="image = index + 1;" :class="{'product__thumbnails-item--active': image === index + 1}">
                  <img :src="item" alt="Thumbnail 1" />
                </div>
              </div>
            </div>
            
            <div class="product__details column is-one-third">
              <h2>{{product.title}}</h2>
              <Stars :product="product.id" link="true" />
              <p v-if="product.body" v-html="product.body"></p>

              <div class="product__options">
                <div class="product__option product__option--with-guide">
                  <h5>Size</h5>
                  <div class="wrap">
                    <b-field>
                      <b-select v-model="size">
                        <option v-for="size in sizes" :value="size.value" :key="`size-${size.value}`">
                          {{ size.label }}
                        </option>
                      </b-select>
                    </b-field>
                  </div>
                </div>

              <div class="product__add-to-cart">
                <div class="product__add">
                  <button class="button is-black" @click="addToCart">Add to cart</button>
                </div>

                <div class="product__price">
                  <h3>{{ priceDisplay(price * quantity) }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SimilarProducts :number="8" />
  </div>
</template>

<script>

import Stars from '~/components/Stars';
import SimilarProducts from '~/components/SimilarProducts';

export default {
  head () {
    return this.product ? {
      title: 'So Far So Bad - ' + this.product.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'tattoo, illustration, design, ink, inked, tattooed, tshirts, apparel, emo, goth, punk, trash, grunge, minimal'},
        { hid: 'ogtitle', property: 'og:title', content: 'So Far So Bad - ' + this.product.title},
        { hid: 'ogdesc', property: 'og:description', content: this.product.body },
        { hid: 'ogtype', property: 'og:type', content: 'product.item'},
        { hid: 'ogurl', property: 'og:url', content: 'https://sofarsobad.co.uk/shop/' + this.$route.params.slug},
        { hid: 'ogimage', property: 'og:image', content: this.product.image1},
        { property: 'product:price:amount', content: this.priceFormatter(this.productTotal)},
        { property: 'product:price:currency', content: 'GBP'},
        { property: 'product:retailer_item_id', content: this.product.id},
        { hid: 'twittercard', name: 'twitter:card', content: 'summary_large_image'},
        { hid: 'twittertitle', name: 'twitter:title', content: 'So Far So Bad - ' + this.product.title},
        { hid: 'twitterdesc', name: 'twitter:description', content: this.product.body},
        { hid: 'twitterimage', name: 'twitter:image', content: this.product.image1},
        { hid: 'fbid', property: 'fb:app_id', content: process.env.FB_ID || null }
      ],
      link: [
        { rel: 'canonical', href: 'https://sofarsobad.co.uk/shop/' + this.$route.params.slug}
      ]
    } : null
  },

  jsonld() {
    return this.product ? {
      "@context" : "https://schema.org",
      "@type" : "Product",
      "name" : this.product.title,
      "image": [
        this.product.image1,
        this.product.image2,
        this.product.image3
      ],
      "description": this.product.body,
      "sku": this.product.slug,
      "brand": {
        "@type": "Brand",
        "name": "So Far So Bad"
      },
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": this.productRating,
          "reviewCount": this.productReviews.length
        },
      "offers": {
        "@type": "Offer",
        "url": "https://sofarsobad.co.uk/shop/" + this.product.slug,
        "priceCurrency": "GBP",
        "price": this.product.price,
        "priceValidUntil": "2030-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      }
    } : null
  },

  transition: 'page',

  data () {
    return {
      prodcutIndex: 0,
      quantity: 1,
      image: 1,
      size: 'small',
      overlay: false,
    }
  },

  components: {
    Stars,
    SimilarProducts
  },

  computed: {
    sizes () {
      return this.$store.state.sizes
    },

    productImages () {
      const images = []
      if (this.product.image1) {
        images.push(this.product.image1)
      }
      if (this.product.image2) {
        images.push(this.product.image2)
      }
      if (this.product.image3) {
        images.push(this.product.image3)
      }
      if (this.product.image4) {
        images.push(this.product.image4)
      }
      if (this.product.image5) {
        images.push(this.product.image5)
      }
      return images
    },
    
    slug () {
      return this.$route.params.slug;
    },

    product () {
      const product = this.$store.state.products.filter((product, index) => {
        if (product.slug === this.slug) {
          this.prodcutIndex = index;
          return product
        }
      });
      return product[0];
    },

    price () {
      let price = this.productTotal
      return price
    },

    productTotal () {
      let price = parseFloat(this.product.price);
      let discount = (price / 100) * this.product.discount;
      price = price - discount;

      return price;
    },

    productReviews () {
      const reviews = this.$store.state.reviews.filter(product => product.id === this.product.id);
      console.log(reviews)
      return reviews;
    },

    productRating () {
      let stars = 0;
      let reviewsTotal = this.productReviews.length;
      if (reviewsTotal) {
        this.productReviews.forEach(review => {
          stars = stars + review.stars;
        });

        return Math.ceil(stars / reviewsTotal);
      } else {
        return 0
      }
    },

    filteredProducts() {
      return this.$store.state.filteredProducts
    }

  },

  methods: {
    nextProduct (direction) {
      let newProductSlug = 0;
      let productIndex = 0;

      this.filteredProducts.forEach((item, index) => {
        if (item.id === this.product.id) {
          productIndex = index
        }
      })
      
      if (direction === 'prev') {
        newProductSlug = this.filteredProducts[productIndex + 1] ? this.filteredProducts[productIndex + 1].slug : this.filteredProducts[0].slug
      } else {
        newProductSlug = this.filteredProducts[productIndex - 1] ? this.filteredProducts[productIndex - 1].slug : this.filteredProducts[this.filteredProducts.length - 1].slug
      }

      this.$router.push('/shop/' + newProductSlug)
    },

    priceDisplay: function(price) {
      return '£' + (Math.floor(price * 100) / 100).toFixed(2)
    },

    priceFormatter: function(price) {
      return (Math.floor(price * 100) / 100).toFixed(2)
    },

    changeQuantity: function(quantity) {
      if (quantity !== 0 && quantity !== 10) {
        this.quantity = quantity;
      }
    },

    addToCart: function() {
      const sizeSKU = this.product['SKU' + this.size.charAt(0).toUpperCase() + this.size.slice(1)]
      this.$store.commit('localStorage/addToCart', [this.product.id, this.size, this.quantity, sizeSKU]);
      this.$buefy.snackbar.open({
        duration: 1000,
        position: 'is-top',
        message: 'Item has been added to your cart!',
        type: 'is-success',
        actionText: null,
        onAction: this.$store.commit('openCart', true)
      });
    },
  }
}
</script>


<style lang="scss" scoped>

  .key-points {
    margin: -25px 0 -50px 0;

    @media (min-width: $medium) {
      margin: -50px 0;
    }
  }

  .product {
    $canvasWidth: 300px;
    $canvasHeight: 480px;
    $canvasDepth: 6px;

    h2 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    $root: &;

    &__title {
      border-bottom: 1px solid lighten($lightgrey, 40%);
      padding-bottom: 15px;

      p {
        margin-top: 10px;
      }
    }

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,.8);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-height: 96vh;
        max-width: 98%;
      }

      @media (min-width: $medium) {
        img {
          max-height: 95vh;
          max-width: 96%;
        }
      }

      &-nav-item {
        color: $black;
        position: absolute;
        top: 50%;
        left: 5px;
        border: none;
        width: 40px;
        height: 40px;
        z-index: 30;
        transition: opacity .5s ease, background .5s ease, color .5s ease;
        cursor: pointer;
        display: block;
        transform: translateY(-50%);

        @media (max-width: $medium) {
          font-size: 14px;

          .icon {
            font-size: 14px;
          }
        }

        @media (min-width: $medium) {
          left: 20px;
          background: $black;
          color: $white;
          border: 1px solid $primary;

          &:hover {
            background: $tertiary;
            color: $white;
          }
        }

        &:nth-of-type(2) {
          left: auto;
          right: 20px;

          @media (max-width: $medium) {
            right: 5px;
          }
        }
      }

      button.close {
        background: $black;
        color: $white;
        position: absolute;
        top: 35px;
        right: 5px;
        border: none;
        width: 40px;
        height: 40px;
        z-index: 30;
        font-size: 12px;
        transition: all .5s ease;
        cursor: pointer;
        display: block;
        transform: translateY(-50%);

        @media (min-width: $medium) {
          top: 50px;
          right: 50px;
          background: $black;
        }

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }
    }

    &__nav-item {
      color: $black;
      background: $white;
      position: absolute;
      top: 50%;
      left: 20px;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: opacity .5s ease, background .5s ease, color .5s ease;
      cursor: pointer;
      display: block;
      transform: translateY(-50%);

      @media (max-width: $medium) {
        font-size: 14px;

        .icon {
          font-size: 14px;
        }
      }

      @media (min-width: $medium) {
        background: $black;
        color: $white;
        border: 1px solid $primary;

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }

      &:nth-of-type(2) {
        left: auto;
        right: 20px;

      }
    }

    &__sku {
      font-size: 14px;
      color: $black;
    }

    &__options {
      padding: 0 0 15px;
      margin-bottom: 15px;
    }

    &__option {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      h5 {
        border-bottom: 1px solid $primary;
        margin-bottom: 5px;
      }

      &--with-guide {
        .guide {
          cursor: pointer;
          color: $lightgrey;
          font-size: 0.75em;
          float: right;
          font-family: $fontBody;

          .icon {
            margin-right: -5px;
          }
        }
      }

      select {
        width: 100%;
      }
    }

    .details {
      padding-bottom: 20px;
      text-align: right;

      label {
        font-size: 0.8em;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
      }

      .toggler-content {
        text-align: left;
      }

      .icon {
        vertical-align: sub;
      }

      table {
        width: 100%;
        margin-bottom: 25px;

        td {
          padding: 10px;
          font-size: 0.6em;

          strong {
            font-size: 1em;
          }
        }
      }
    }

    &__price {
      font-size: 1.2em;

      .discount {
        font-size: 0.6em;
        color: $lightgrey;
        text-decoration: line-through;
      }
    }

    &__add-to-cart {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    &__quantity {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 15px;

      @media (max-width: $medium) {
        justify-content: center;
        margin: 0;
      }

      span {
        padding: 0 20px;
      }
    }

    &__button {
      border: 2px solid $white;
      transition: all .3s ease;
      background: $white;
      padding: 6px 8px;
      font-size: 0.8em;
      margin: 5px 10px 5px 0;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      width: calc(50% - 5px);
      cursor: pointer;

      &:nth-child(even) {
        margin-right: 0;
      }

      @media (min-width: $medium) {
        width: auto;

        &:nth-child(even) {
          margin-right: 10px;
        }
      }

      @media (min-width: $large) {
        margin-bottom: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &--active, &:hover, &--disabled {
        border-color: #000;
        background: #000;
        color: $white;
      }
    }

    &__image {
      text-align: center;
      border: 1px solid lighten($lightgrey, 35%);
      height: 300px;
      overflow: hidden;
      position: relative;

      @media (min-width: $small) {
        height: 450px;
      }

      @media (min-width: $large) {
        height: 510px;
      }

      @media (min-width: $superlarge) {
        height: 670px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &__image-fullscreen {
      position: absolute;
      z-index: 20;
      top: 5px;
      right: 5px;
      color: $black;
      border: none;
      width: 40px;
      height: 40px;
      z-index: 30;
      transition: all .5s ease;
      cursor: pointer;
      display: block;

      @media (max-width: $medium) {
        font-size: 14px;

        .icon {
          font-size: 14px;
        }
      }

      @media (min-width: $medium) {
        right: 20px;
        top: 20px;
        background: $black;
        color: $white;
        border: 1px solid $primary;

        &:hover {
          background: $tertiary;
          color: $white;
        }
      }      
    }

    &__dynamic-preview {
      border: 2px solid lighten($lightgrey, 40%);
      background-size: cover;
      background-position: center;
      padding-top: 15px;
      margin-bottom: -280px;
      transform-origin: left top;
      transform: scale(0.5);
      width: 200%;
      height: 585px;
      transition: all 0.3s ease;

      @media (min-width: $large) {
        transform: scale(1);
        width: 100%;
        margin-bottom: 0;
        background-position: center top;
      }
    }

    .small {
      color: $lightgrey;
      font-size: 0.6em;
    }

    &__canvas {
      margin: -($canvasDepth/2) auto auto;
      position: relative;
      width: $canvasWidth;
      height: $canvasHeight;
      box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.45);
      background-size: 101%;
      transform-origin: center;
      transition: all .3s ease;
      background-size: cover;
      background-position: center;
    }

    &__canvas-top {
      transform: scaleY(-1) skew(45deg, 0);
      transform-origin: 0% 50%;
      margin-left: $canvasDepth/2;
      top: -$canvasDepth;
      background-image: inherit;
      background-size: cover !important;
      background-position: top right;
      position: absolute;
      width: 100%;
      height: $canvasDepth;
      border-top: 1px solid lighten($lightgrey, 40%);
      border-right: 1px solid $lightgrey;

      &::after {
        display: block;
        content: "";
        position: absolute;
        width: inherit;
        height: inherit;
        background: rgba(#000, 0.25);
      }
    }

    &__canvas-right {
      transform: scaleX(-1) skew(0, 45deg);
      position: absolute;
      transform-origin: 0% 50%;
      margin-left: $canvasDepth;
      margin-top: -$canvasDepth;
      left: 100%;
      background-image: inherit;
      background-size: cover !important;
      background-position: top right;
      width: $canvasDepth;
      height: 100%;
      border-right: 1px solid lighten($lightgrey, 40%);

      &::after {
        display: block;
        content: "";
        position: absolute;
        width: $canvasDepth;
        height: $canvasHeight;
        background: rgba(#000, 0.38);
      }
    }

    &__frame {
      overflow: hidden;
      height: 100%;
      width: 100%;
      border: 10px solid #000;
      position: relative;

      &::after {
        content: '';
        display: block;
        border: 1px solid $primary;
        box-shadow: inset 3px 3px 6px -4px rgba(0, 0, 0, 0.5);
        padding: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }

    &--landscape {

      .product__image {
        img {
          width: 100%;
        }
      }

      #{$root}__canvas {
        width: $canvasHeight;
        height: $canvasWidth;
      }

      #{$root}__canvas-right {
        &::after {
          height: $canvasWidth;
        }
      }
    }

    &__thumbnails {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      
      @media (max-width: $medium) {
        justify-content: space-around;
        display: none;
      }
    }

    &__thumbnails-item {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border: 2px solid lighten($lightgrey, 20%);
      color: $secondary;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      font-size: 0.8em;
      cursor: pointer;
      transition: all .5s ease;

      @media (max-width: $medium) {
        margin: 5px;
      }

      &:last-child {
        margin-right: 0;
      }

      &--active, &:hover {
        border-color: $tertiary;
      }

      img {
        height: 100%;
        width: 100%;
        display: block;
        object-fit: cover;
      }
    }

    &__navigation span {
      cursor: pointer;
    }
  }
</style>

<style lang="scss">
  .product__details {
    .select {
      width: 100%;

      select {
        width: 100%;
      }
    }
  }
</style>