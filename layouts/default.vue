<template>
  <div :class="{'page': true, 'page--home': home}">
    <Header :loaded="loaded" />
    <main keep-alive>
      <div class="page-main">
        <div class="container">
          <Messages />
        </div>
        <nuxt :loaded="loading" />
      </div>
      <b-loading :is-full-page="true" v-model="loading"></b-loading>
      <slideshow />
      <Newsletter />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header';
import Newsletter from '~/components/Newsletter';
import Footer from '~/components/Footer';
import Messages from '~/components/Messages';
import Loading from '~/components/Loading';
import Slideshow from '~/components/Slideshow.vue';

export default { 
  components: {
    Header,
    Newsletter,
    Footer,
    Messages,
    Loading,
    Slideshow
  },

  mounted() {
    this.$store.dispatch('getShopData');
  },

  computed: {
    loaded() {
      return this.$store.state.loaded;
    },
    redirecting() {
      return this.$store.state.redirecting;
    },
    home() {
      return this.$route.name === 'index'
    },
    loading() {
      if (!this.loaded || this.redirecting) {
        return true;
      }
    }
  },
}
</script>
