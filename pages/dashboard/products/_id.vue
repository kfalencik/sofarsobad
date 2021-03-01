<template>
  <div v-if="product">
    <h2>{{ product.title }}</h2>

    <div class="content">
      <form class="form">
        <b-field class="form__input" label="Product name">
          <b-input placeholder="Product name" v-model="title" required></b-input>
        </b-field>

        <b-field message='Has to be unique.' class="form__input" label="SKU">
          <b-input placeholder="SKU" v-model="slug" disabled></b-input>
        </b-field>

        <b-field class="form__input" label="Description">
          <b-input maxlength="1000" type="textarea" v-model="body" placeholder="Description"></b-input>
        </b-field>

        <b-field class="form__input file" label="Main Image">
          <b-upload v-model="image1" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <div class="file-thumbnail" v-if="image1URL">
          <img :src="image1URL" />
        </div>

        <b-field class="form__input file" label="Image 1">
          <b-upload v-model="image2" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
        </b-field>

        <span class="file-thumbnail" v-if="image2URL">
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

        <span class="file-thumbnail" v-if="image3URL">
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

        <span class="file-thumbnail" v-if="image4URL">
          <img :src="image4URL" />
        </span>

        <b-field class="form__input file" label="Image 4">
          <b-upload v-model="image5" required>
            <a class="button is-info">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-thumbnail" v-if="image5URL">
            <img :src="image5URL" />
          </span>
        </b-field>

        <b-field message='In GBP for example: "120.99"' class="form__input" label="Price">
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
          <button type="button" @click.stop="editProduct" class="button is-success">Save Changes</button>
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
      price: 0,
      discount: 0,
      bought: 0,
      tags: [],
      latestId: 0,
      file: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image1URL: null,
      image2URL: null,
      image3URL: null,
      image4URL: null,
      image5URL: null,
    }
  },
  layout: 'dashboard',
  computed: {
    id () {
      return this.$route.params.id;
    },
    product () {
      let product = this.$store.state.products.filter(product => product.id === parseInt(this.id));
      product = product[0];
      this.title = product.title;
      this.body = product.body;
      this.slug = product.slug;
      this.price = product.price;
      this.discount = product.discount;
      this.bought = product.bought;
      this.panorama = product.panorama ? product.panorama : false
      this.tags = product.tags ? product.tags.split(',') : [];
      
      this.image1URL = product.image1
      this.image2URL = product.image2
      this.image3URL = product.image3
      this.image4URL = product.image4
      this.image5URL = product.image5
      this.image6URL = product.image6
      this.image7URL = product.image7
      this.image8URL = product.image8
      this.image9URL = product.image9

      return product;
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
    editProduct: function() {
      if (
        this.title === '' ||
        this.slug === '' ||
        this.price === 0 ||
        this.tags === '' ||
        this.bought === ''
      ) {
        this.$store.commit('addMessage', ['Please fill in all the required fields.', 'bad']);
      } else {
        this.$store.dispatch('redirecting');

        const imagesUpload = [
          {
            id: 1,
            image: this.image1
          },
          {
            id: 2,
            image: this.image2
          },
          {
            id: 3,
            image: this.image3
          },
          {
            id: 4,
            image: this.image4
          },
          {
            id: 5,
            image: this.image5
          }
        ]

        this.$store.commit('editProduct', [
          this.product.id, 
          {
            title: this.title,
            slug: this.slug,
            body: this.body,
            price: this.price,
            discount: this.discount,
            bought: this.bought,
            tags: this.tags.join(", ")
          },
          imagesUpload
        ]);

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
