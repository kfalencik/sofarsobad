<template>
  <div class="about-me">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <h2>{{section.title}}</h2>
            <div v-html="section.description"></div>
            <q>{{section.quote}}</q>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    section () {
      return this.$store.state.homepage.section1;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>