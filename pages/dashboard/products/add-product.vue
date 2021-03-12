<template>
  <div>
    <h2>Add a Product</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Product name">
          <b-input placeholder="Product name" v-model="title" required></b-input>
        </b-field>

        <b-field message='Has to be unique.' class="form__input" label="SKU">
          <b-input placeholder="SKU" v-model="slug" required></b-input>
        </b-field>

        <b-field class="form__input" label="Description">
          <b-input maxlength="1000" type="textarea" placeholder="Description" v-model="body"></b-input>
        </b-field>

        <b-field class="form__input file" label="Main Image">
          <b-upload v-model="image1" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image1">
            <img :src="image1URL" />
          </span>

        <b-field class="form__input file" label="Image 1">
          <b-upload v-model="image2" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image2">
          <img :src="image2URL" />
        </span>

        <b-field class="form__input file" label="Image 2">
          <b-upload v-model="image3" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image3">
            <img :src="image3URL" />
          </span>

        <b-field class="form__input file" label="Image 3">
          <b-upload v-model="image4" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image4">
            <img :src="image4URL" />
          </span>

        <b-field class="form__input file" label="Image 4">
          <b-upload v-model="image5" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image5">
          <img :src="image5URL" />
        </span>

        <h3>Sizes</h3>

        <b-field class="form__input" label="Small SKU">
          <b-input placeholder="Small SKU" v-model="SKUSmall"></b-input>
        </b-field>

        <b-field class="form__input" label="Medium SKU">
          <b-input placeholder="Medium SKU" v-model="SKUMedium"></b-input>
        </b-field>

        <b-field class="form__input" label="Large SKU">
          <b-input placeholder="Large SKU" v-model="SKULarge"></b-input>
        </b-field>

        <b-field class="form__input" label="XLarge SKU">
          <b-input placeholder="Xlarge SKU" v-model="SKUXLarge"></b-input>
        </b-field>

        <b-field message='n GBP for example: "120.99"' class="form__input" label="Price">
          <b-input placeholder="Price" v-model="price" required></b-input>
        </b-field>

        <b-field message='As a percentage for example: "20"' class="form__input" label="Discount">
          <b-input placeholder="Discount" v-model="discount" required></b-input>
        </b-field>

        <b-field class="form__input" label="Sales Number">
          <b-input placeholder="Sales Number" v-model="bought" required></b-input>
        </b-field>

        <b-field class="form__input" message="Used for search and SEO." label="Product Tags">
          <b-taginput
            v-model="tags"
            ellipsis
            icon="label"
            placeholder="Tags">
          </b-taginput>
        </b-field>

        <div class="form__input form__input--buttons">
          <button type="button" @click="addProduct" class="button is-success">Add Product</button>
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
      body: '',
      slug: '',
      SKUSmall: '',
      SKUMedium: '',
      SKULarge: '',
      SKUXLarge: '',
      price: 0,
      discount: 0,
      bought: 0,
      tags: [],
      latestId: 0,
      image1: null,
      image1URL: null,
      image2: null,
      image2URL: null,
      image3: null,
      image3URL: null,
      image4: null,
      image4URL: null,
      image5: null,
      image5URL: null
    }
  },
  layout: 'dashboard',
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  watch: {
    image1 (o) {
      if (!this.image1 || this.image1.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Wrong file format!', 'bad']);
        this.image1 = null
        this.image1URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image1URL = e.target.result
        
        this.image1URL = reader.readAsDataURL(o);
      }
    },
    image2 (o) {
      if (!this.image2 || this.image2.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Wrong file format!', 'bad']);
        this.image2 = null
        this.image2URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image2URL = e.target.result
        
        this.image2URL = reader.readAsDataURL(o);
      }
    },
    image3 (o) {
      if (!this.image3 || this.image3.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Wrong file format!', 'bad']);
        this.image3 = null
        this.image3URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image3URL = e.target.result
        
        this.image3URL = reader.readAsDataURL(o);
      }
    },
    image4 (o) {
      if (!this.image4 || this.image4.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Wrong file format!', 'bad']);
        this.image4 = null
        this.image4URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image4URL = e.target.result
        
        this.image4URL = reader.readAsDataURL(o);
      }
    },
    image5 (o) {
      if (!this.image5 || this.image5.type !== 'image/jpeg') {
        this.$store.commit('addMessage', ['Wrong file format!', 'bad']);
        this.image5 = null
        this.image5URL = null
      } else {
        var reader = new FileReader();
        reader.onload = e => this.image5URL = e.target.result
        
        this.image5URL = reader.readAsDataURL(o);
      }
    }
  },
  methods: {
    addProduct: function() {
      if (
        this.title === '' ||
        this.slug === '' ||
        this.price === 0 ||
        this.tags === ''
      ){
        this.$store.commit('addMessage', ['Please fill in all the required fields.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');

        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;

        this.products.forEach(product => {
          if (parseInt(product.id) > this.latestId) {
            this.latestId = product.id;
          }
        })

        this.latestId = this.latestId + 1;

        const uploadImages = [this.image1]

        if (this.image2) {
          uploadImages.push(this.image2)
        }
        if (this.image3) {
          uploadImages.push(this.image3)
        }
        if (this.image4) {
          uploadImages.push(this.image4)
        }
        if (this.image5) {
          uploadImages.push(this.image5)
        }

        this.$store.commit('addProduct', [
          {
            id: this.latestId,
            title: this.title,
            body: this.body,
            slug: this.slug,
            SKUSmall: this.SKUSmall,
            SKUMedium: this.SKUMedium,
            SKULarge: this.SKULarge,
            SKUXLarge: this.SKUXLarge,
            price: this.price,
            discount: parseInt(this.discount),
            tags: this.tags.join(", "),
            date: date,
            bought: this.bought,
          },
          uploadImages
        ]);

        this.$buefy.toast.open({message: 'Product successfully added!', type: 'is-success'});
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

    .field.form__input > .control input[type=text] {
      border: 1px solid $black;
    }

    .file-thumbnail {
      margin-top: 15px;

      img {
        max-height: 200px;
      }
    }

    &__input-description {
      font-size: 0.6em;
    }
  }
</style>
