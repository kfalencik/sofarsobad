<template>
  <header class="header">
    <div class="section">
      <div class="header__wrapper">
        <div class="header__left">
          <div class="header__logo">
            <router-link to="/">
              <h1 class="sr-only">So Far So Bad</h1>
              <img src="/logo-white.png" alt="So Far So Bad" height="35" />
            </router-link>
          </div>
        </div>

        <div class="header__center">
          <div class="header__navigation">
            <b-button size="is-small" class="mobile" @click.stop.prevent="toggleMenu">
              <b-icon icon="menu" custom-size="mdi-24px"></b-icon> <span class="sr-only">&nbsp;Menu</span>
            </b-button>
            <nav :class="{'header__main-nav': true, 'active': navigation}">
              <ul>
                <li>
                  <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/shop">Shop</nuxt-link>
                </li>
                <!-- <li>
                  <a href="https://etsy.com" target="_blank" rel="noopener">Etsy shop</a>
                </li> -->
                <li>
                  <nuxt-link to="/contact">Contact</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="header__right">
          <div class="header__user-menu">
            <nav>
              <ul>
                <li>
                  <a href="https://facebook.com/sofarsobadapparel" target="_blank" rel="noreferrer">
                    <b-icon icon="facebook"></b-icon>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/sofarsobadapparel/" target="_blank" rel="noreferrer">
                    <b-icon icon="instagram"></b-icon>
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent.stop="toggleCart">
                    <b-icon icon="cart-outline" custom-size="mdi-24px"></b-icon>
                    <span class="header__notification-indicator">{{ totalCart }} <span class="sr-only">products in cart</span></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <b-sidebar
      v-if="loaded"
      :fullheight="true"
      :right="true"
      v-model="openCart"
      :overlay="true"
    >
      <div class="sidebar-cart p-4">
        <h2>Cart</h2>
        <Cart />
      </div>
    </b-sidebar>
  </header>
</template>

<script>
import Cart from '~/components/Cart';

  export default{
    data () {
      return {
        siteName: 'So Far So Bad',
        navigation: false
      }
    },

    props: {
      loaded: {
        default: false,
        type: Boolean
      }
    },

    components: {
      Cart
    },

    mounted() {
      const self = this;

      document.body.addEventListener('click', function(event) {
        self.navigation = false;
      });
    },

    computed: {
      searchKeyword: {
        set (search) {
          this.$store.commit('setSearchKeyword', search);
        },
        get () {
          return this.$store.state.searchKeyword;
        }
      },
      categories() {
        return this.$store.state.categories;
      },
      cart() {
        return this.$store.state.localStorage.cart;
      },
      openCart: {
        set (value) {
          this.$store.commit('openCart', value);
        },
        get () {
          return this.$store.state.openCart;
        }
        
      },
      totalCart() {
        let total = 0;

        this.cart.forEach(item => {
          total = total + item.quantity;
        });

        return total;
      }
    },

    methods: {
      toggleMenu: function(event) {
        this.navigation = !this.navigation;
      },
      selectCategory: function(slug) {
        this.$store.commit('setFilterCategory', slug);
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts', 'popularity-az');
        this.$router.push('/shop');
      },
      search: function() {
        this.$store.dispatch('filterProducts');
        this.$store.commit('sortProducts');
        this.$router.push('/shop');
      },
      toggleCart: function() {
        this.$store.commit('openCart');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    z-index: 20;
    background: $black;
    position: sticky;
    top: 0;

    .section {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    &__wrapper {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      width: 140px;

      img {
        display: block;
      }

      @media (min-width: $medium) {
        width: 200px;
        margin-right: 25px;
      }
    }

    &__left {
      order: 2;
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;

      @media (min-width: $medium) {
        order: 1;
        justify-content: left;
      }
    }

    &__right {
      order: 3;
      flex: 1;
      width: 225px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    &__center {
      order: 1;
      flex: 1;
      justify-content: center;

      @media (min-width: $medium) {
        order: 2;
        width: 100%;
        max-width: 1180px;
        display: flex;
        flex-direction: row;
      }
    }

    &__search {
      display: none;

      form {
        padding-top: 0;

        .control {
          flex: 1;
        }

        .is-primary {
          background-color: $white;
          border-color: $white;
        }
      }

      @media (min-width: $medium) {
        display: block;
        width: 100%;
      }

      form {
        display: flex;
        flex-direction: row;
      }

      button {
        color: $white;
        background: none;
      }
    }

    &__navigation {
      position: relative;

      button {
        @media (min-width: $medium) {
          display: none;
        }

        .icon {
          margin: 0 !important;
        }

        span:last-child {
          display: none
        }

        @media (min-width: $large) {
          min-width: 260px;

          span:last-child {
            display: initial;
          }
        }
      }
    }

    @media (min-width: $medium) {
      &__main-nav {
        li {
          float: left;
          list-style: none;
          margin-right: 25px;
          border-bottom: 2px solid transparent;

          a {
            color: $white;
            letter-spacing: 0.2em;
            padding-bottom: 8px;
            text-transform: uppercase;
            border-bottom: 2px solid transparent;


            &.nuxt-link-exact-active, &:hover {
              border-bottom: 2px solid $white;
            }
          }
        }
      }
    }

    @media (max-width: $medium) {
      &__main-nav {
        position: absolute;
        opacity: 0;
        z-index: 20;
        left: 0;
        width: 100%;
        min-width: 250px;
        top: 50px;
        background: $black;
        border-radius: 3px;
        padding: 20px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15);
        border: 2px solid $lightgrey;
        transition: all .3s ease;
        transform: scaleY(0);
        transform-origin: top;

        &.active {
          opacity: 1;
          transform: scaleY(1);
        }

        @media (min-width: $medium) {
          left: -100px;

          &::before {
            bottom: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(194, 225, 245, 0);
            border-bottom-color: $lightgrey;
            border-width: 20px;
            margin-left: -20px;
          }

          &::after {
            bottom: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(136, 183, 213, 0);
            border-bottom-color: $white;
            border-width: 17px;
            margin-left: -17px;
          }
        }

        @media (min-width: $large) {
          left: 0;
        }

        ul {
          margin-left: 0;
        }

        li {
          list-style: none;
          padding: 0;
          width: 100%;
          height: auto;
          position: relative;
          border-bottom: 1px solid #ddd;
          float: none;
          transition: all .3s ease;

          &:hover {
            border-color: $tertiary;
          }

          a {
            padding: 12px 0;
            display: block;
            font-size: 0.8em;
            color: $white;
          }
        }
      }
    }

    &__notification-indicator {
      background: $red;
      color: $white;
      width: 16px;
      height: 16px;
      position: absolute;
      border-radius: 100%;
      font-size: 0.6em;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      right: -5px;
      bottom: -5px;
    }

    &__user-menu {
      text-align: right;

      ul {
        margin-left: 0;
      }

      li {
        list-style: none;
        padding: 0;
        display: inline-block;

        @media (min-width: $medium) {
          margin-left: 10px;
        }

        a {
          position: relative;
          color: $white;
        }
      }
    }
  }

  .mobile {
    border: none;
    padding: 0;
    margin: 0;
    height: auto;
    color: $white;
    background: none;
  }

  @media (min-width: $medium) {
    .mobile {
      display: none;
    }
  }

  .sidebar-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
