<template>
  <div class="section" v-if="product">
    <div class="container">
      <div>
        <router-link :to="'/shop/' + product.slug">Go back to product page</router-link>
      </div>

      <h2>{{product.title}} - customer reviews</h2>

      <div class="reviews" v-if="reviews.length">
        <div class="reviews__item" v-for="(review, index) in reviews" :key="'reivew-' + index">
          <Stars :stars="review.stars" />
          <p>{{review.review}}</p>
        </div>
      </div>

      <p v-else>There are no reviews for this product yet.</p>
    </div>

    <div class="container add-review">
      <h3>Add a review</h3>
      <div class="stars">
        <span v-for="index in 5" :key="'star-' + index" @click="changeStars(index)">
          <b-icon :icon="parseInt(reviewStars) >= index ? 'star' : 'star-outline'" />
        </span>
        <span class="stars__desc">- {{ reviewStars }} / 5</span>
      </div>

      <b-field label="Author">
        <b-input name="reviewAuthor" v-model="reviewAuthor" required></b-input>
      </b-field>

      <b-field label="Subject">
        <b-input name="title" v-model="reviewTitle" required></b-input>
      </b-field>

      <b-field label="Comment">
        <b-input name="review" maxlength="500" type="textarea" v-model="reviewText" required></b-input>
      </b-field>

      <div class="sr-only honeyhaxpot">
        <b-input name="name" v-model="honey"></b-input>
      </div>

      <div class="actions">
        <button class="button is-success" type="button" @click="addReview">Add review</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Stars from '~/components/Stars';

  export default {
    head () {
      return {
        title: 'So Far So Bad - ' + this.product ? this.product.title : null + ' reviews',
      }
    },
    transition: 'page',
    data() {
      return {
        honey: '',
        reviewTitle: '',
        reviewText: '',
        reviewStars: 5
      }
    },
    components: {
      Stars,
    },
    computed: {
      reviews() {
        let reviews = this.$store.state.reviews;
        reviews = reviews.filter(review => review.id === parseInt(this.id));
        return reviews.sort((a, b) => (a.date > b.date) ? 1 : -1);
      },
      id() {
        return this.$route.params.id;
      },
      product() {
        const product = this.$store.state.products.filter(product => product.id === parseInt(this.id));
        return product[0];
      },
    },
    methods: {
      changeStars: function(stars) {
        this.reviewStars = stars;
      },
      addReview: function() {
        if (this.honey === '') {
          let date = new Date();
          this.$store.commit('addReview', {id: parseInt(this.id), review: this.reviewText, stars: this.reviewStars, date: date});
          this.reviewStars = 5;
          this.reviewText = '';
          this.$store.commit('addMessage', ['Thank you! Your review has been successfully added.', 'good']);
        }
      }
    },
    jsonld() {
      const reviews = this.reviews.map((review) => {
        return {
          "@context": "https://schema.org/",
          "@type": "Review",
          "itemReviewed": {
            "@type": "Product",
            "name": this.product ? this.product.title : null,
            "category": this.product ? this.product.category : null,
            "image": this.product ? this.product.image1 : null,
            "productID": this.product ? this.product.id : null,
            "priceRange": "$$",
            "brand": {
              "@type": "Brand",
              "name": "So Far So Bad"
            },
            "description": this.product ? this.product.description : null,
            "sku": this.product ? this.product.slug : null,
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.stars
          },
          "reviewBody": review.review
        }
      })

      return reviews
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    margin-top: 20px;
  }

  .reviews {
    margin-top: 35px;

    &__item {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid lighten($lightgrey, 40%);
    }
  }

  .add-review {
    margin-top: 50px;

    .stars {
      margin: 20px 0 10px;
      display: flex;
      flex-direction: row;

      &__desc {
        color: $lightgrey;
        font-size: 0.8em;
      }

      .icon {
        color: orange;
      }
    }
  }
</style>
