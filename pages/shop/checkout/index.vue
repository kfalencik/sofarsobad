<template>
  <div class="section section--page">
    <div class="container">
      <div class="page-header">
        <h2>Checkout</h2>
        <template v-if="loading && !payment">
          <article class="message is-warning">
            <div class="message-body">
              PLEASE NOTE: Due to the current status of the pandemic, the orders can take from 7 up to 14 working days to reach you. We're sorry if that causes any inconvenience.
            </div>
          </article>
          <p v-if="cart.length > 0">Please provide your address and billing information to proceed with the transaction.</p>
          <p v-else>There are no items in your cart. Please add some items from <router-link to="/shop"><strong>our shop</strong></router-link> first.</p>
        </template>
        <article class="message is-warning" v-if="payment">
          <div class="message-body">
            <p>Please wait while we process your order payment.</p>
          </div>
        </article>
        <Loading v-if="!loading || payment" />
      </div>

      <template v-if="cart.length > 0 && loading">
        <div class="columns" v-show="!payment">
          <div class="column">
            <form>
              <div class="checkout-panel">
                <div class="header">
                  <h4>Personal Information <b-icon icon="human-greeting" /></h4>
                </div>

                <div class="content">
                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Title*">
                        <b-select name="title" icon="clipboard-account" placeholder="Title" v-model="personalTitle" expanded required :disabled="checkoutValidation">
                          <option selected value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                          <option value="Prof">Prof</option>
                        </b-select>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="First Name*">
                        <b-input name="firstname" icon="clipboard-account" placeholder="First name" v-model="personalFirstName" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Last Name*">
                        <b-input name="lastname" icon="clipboard-account" placeholder="Last name" v-model="personalLastName" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Email address*">
                        <b-input name="email" icon="at" placeholder="Email address" type="email" v-model="personalEmail" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Phone number*">
                        <b-input name="phone" icon="cellphone" placeholder="Phone number" v-model="personalPhone" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Company Name">
                        <b-input name="company" icon="domain" placeholder="Company name" v-model="personalCompanyName" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>

              <div class="checkout-panel">
                <div class="header">
                  <h4>Delivery information <b-icon icon="truck" /></h4>
                </div>

                <div class="content">
                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="Address line 1*">
                        <b-input name="ship-address" icon="map-marker" placeholder="Address 1" v-model="deliveryAddress1" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Address line 2">
                        <b-input name="ship-address2" icon="map-marker" placeholder="Optional" v-model="deliveryAddress2" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Address line 3">
                        <b-input name="ship-address3" icon="map-marker" placeholder="Optional" v-model="deliveryAddress3" :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column is-one-third">
                      <b-field label="City*">
                        <b-input name="ship-city" icon="city" placeholder="City" v-model="deliveryCity" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Post Code*">
                        <b-input name="ship-zipcode" icon="map-marker" placeholder="Post Code" v-model="deliveryZipCode" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>

                    <div class="column is-one-third">
                      <b-field label="Region">
                        <b-input name="ship-zipcode" icon="map" placeholder="Region" v-model="deliveryState" required :disabled="checkoutValidation"></b-input>
                      </b-field>
                    </div>
                  </div>

                  <div class="columns" v-if="!checkoutValidation">
                    <div class="column">
                      <div class="checkout-panel checkout-panel--confirm">
                        <button class="button is-black" type="button" @click.stop="validateDetails">Confirm and pay</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            </form>
        </div>

          <div class="column is-narrow">
            <div class="checkout-panel checkout-panel--pay">
              <div class="header">
                <h4>Your total - £{{priceFormatter(total)}}</h4>
                <img src="/payment-methods.png" width="200" alt="" role="presentation" />
              </div>

              <div class="content" v-if="checkoutValidation">
                <p>Your details have been now saved. Please pay by clicking on the button below or <a @click.stop="checkoutValidation = false">edit your details</a>.</p>
                <client-only>

                  <!-- :amount="priceFormatter(total + tax).toString()"
                    :details="{
                      tax: priceFormatter(tax),
                      subtotal: priceFormatter(total).toString()
                    }" -->

                  <paypal-checkout
                    :amount="priceFormatter(total).toString()"
                    currency="GBP"
                    :env="credentials.env"
                    :client="credentials"
                    :items="cartProducts"
                    :button-style="buttonStyle"
                    @payment-authorized="paymentAuthorized"
                    @payment-complete="paymentComplete"
                    @payment-cancelled="paymentCancelled"
                    :experience="experienceOptions"
                  >
                  </paypal-checkout>
                </client-only>

                <div id="paypal-button-container"></div>
                  <script src="https://www.paypal.com/sdk/js?client-id=ARz-zZbhI3do6XeIvY0-Ft4r47YJRhr6ZpN4-WxBRW-yNPoZhBJq8LkFTMRuvB1B_yD-pS-tbike3yx_&currency=USD" data-sdk-integration-source="button-factory"></script>
                  <script>
                    
                  </script>
              </div>

              <div v-else>
                <p>Please fill in all the details to complete your order.</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading';

export default {
    head () {
      return {
        title: 'So Far So Bad - Checkout',
      }
    },
    components: {
      Loading
    },
    props: {
      loaded: {
        default: false,
        type: Boolean
      }
    },
    data() {
        return {
        payment: false,
        tax: 0,
        credentials: {
          env: process.env.PP_ENV,
          sandbox: process.env.PP_CID,
          production: process.env.PP_CIDD
        },
        experienceOptions: {
          name: "So Far So Bad",
          presentation: {
            brand_name: "So Far So Bad",
            logo_image: "https://sofarsobad.co.uk/logo-white.png"
          },
          input_fields: {
            no_shipping: 1
          }
        },
        buttonStyle: {
          label: 'paypal',
          size:  'responsive',
          shape: 'rect',
          color: 'black',
          tagline: 'false'
        },
        checkoutStep: 1,
        checkoutValidation: false,
        personalTitle: 'Mr',
        personalFirstName: '',
        personalLastName: '',
        personalCompanyName: '',
        personalEmail: '',
        personalPhone: '',
        deliveryAddress1: '',
        deliveryAddress2: '',
        deliveryAddress3: '',
        deliveryCity: '',
        deliveryZipCode: '',
        deliveryState: ''
      }
    },
    computed: {
      loading () {
        return this.$store.state.loaded;
      },
      cart() {
        return this.$store.state.localStorage.cart
      },
      discount() {
        return this.$store.state.localStorage.discount;
      },
      discounts() {
        return this.$store.state.discounts;
      },
      sizes () {
        return this.$store.state.sizes;
      },
      total() {
        let price = 0;

        if (this.cart) {
          this.cart.forEach(item => {
            let product = this.product(item.product);
            if (product) {
              let productPrice = product.price
              let productDiscount = (productPrice / 100) * product.discount;
              productPrice = productPrice - productDiscount;
              price = price + (productPrice * item.quantity);
            }
          });

          if (this.discount !== null) {
            price = price - ((price / 100) * this.discounts[this.discount].discount);
          }

          this.tax = parseFloat(((price / 100) * 7).toFixed(2));
        }
        return price;
      },
      cartProducts() {
        let items = [];
        let cartTotal = 0;

        this.cart.forEach(item => {
          let product = this.product(item.product);
          let productPrice = this.productWithExtras(product);
          let price = productPrice * item.quantity;
          cartTotal = cartTotal + price;

          items.push({
            "name": product.title,
            "sku": `${item.sku}`,
            "description": this.extrasFromatter(item.size),
            "quantity": item.quantity,
            "price": this.priceFormatter(productPrice),
            "currency": "GBP"
          });
        });

        if (this.discount !== null) {
          let totalDiscount = ((cartTotal / 100) * this.discounts[this.discount].discount);

          items.push({
            "name": 'Discount - ' + this.discounts[this.discount].title,
            "description": 'Code: ' + this.discounts[this.discount].code,
            "quantity": 1,
            "price": this.priceFormatter(totalDiscount * -1),
            "currency": "GBP"
          });
        }

        return items;
      }
    },
    methods: {
        paymentAuthorized: function(event) {
          const self = this;
          self.payment = true;

          this.$store.commit('localStorage/completeOrder', [{
            title: this.personalTitle,
            firstName: this.personalFirstName,
            lastName: this.personalLastName,
            company: this.personalCompanyName,
            email: this.personalEmail,
            phone: this.personalPhone,
            address1: this.deliveryAddress1,
            address2: this.deliveryAddress2,
            address3: this.deliveryAddress3,
            city: this.deliveryCity,
            zipcode: this.deliveryZipCode,
            state: this.deliveryState
          }, event, this.cartProducts, this.priceFormatter(this.total), this.priceFormatter(this.total), this.tax, 'paid']);
        },
        paymentCancelled: function(event) {
          this.$buefy.toast.open({message: 'Your order was unsuccessful, please try again', type: 'is-danger'});
        },
        paymentComplete: function(event) {
          this.paymentAuthorized(event);
        },
        priceFormatter: function(price) {
          return (Math.floor(price * 100) / 100).toFixed(2)
        },
        extrasFromatter: function(size) {
          size = this.sizes.find(item => item.value === size).label
          return size;
        },
        product(id) {
            const product = this.$store.state.products.filter(product => product.id === parseInt(id));
            return product[0];
        },
        productTotal(product, extras) {
            let price = product.price;
            let discount = (price / 100) * product.discount;
            price = price - discount;

            return price;
        },
        productWithExtras(product, extras) {
          let price = product.price;
          let productDiscount = (price / 100) * product.discount;
          price = price - productDiscount;


          return price;
        },
        validateDetails() {
            if (
                this.personalTitle !== '' &&
                this.personalFirstName !== '' &&
                this.personalLastName !== '' &&
                this.personalEmail !== '' &&
                this.personalPhone !== '' &&
                this.deliveryAddress1 !== '' &&
                this.deliveryCity !== '' &&
                this.deliveryZipCode !== ''
            ) {
                this.checkoutValidation = true;
              if(window.innerWidth < 1024) {
                window.scroll({
                    top: document.querySelector('.checkout-panel--pay').getBoundingClientRect().top + window.scrollY,
                    left: 0,
                    behavior: 'smooth'
                });
              }
            } else {
              this.$buefy.toast.open({message: 'Please fill in all required fields before submitting the form!', type: 'is-danger'});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    min-height: 60vh;
    flex-direction: column;

    .header {
      margin: 15px 0;
      font-weight: bold;
      font-size: 18px;
    }

    h2 {
      margin-top: 20px;
    }

    p {
        margin-top: 20px;
    }
  }

  .checkout-panel {
      margin-top: 35px;
      padding-bottom: 20px;

      &--confirm {
        text-align: right;
      }

      &--pay {
          @media (min-width: $large) {
              width: 280px;
          }
      }

      .header {

          .icon {
              float: left;
              margin-right: 15px;
          }
      }
  }
</style>

<style lang="scss">
.control.has-icons-left .input, .select select {
  border: 1px solid $black;
}
</style>
