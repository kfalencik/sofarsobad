<template>
  <div class="section">
    <div class="container">
      <b-button @click="test">test</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      test: function() {
        this.$store.commit('localStorage/printify');
      }
    }
  }
</script>