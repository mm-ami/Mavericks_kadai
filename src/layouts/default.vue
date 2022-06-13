<template>
  <section>
    <total-header></total-header>
    <Nuxt />
  </section>
</template>

<script>
import TotalHeader from "../components/TotalHeader.vue";

export default {
  name: 'MainPage',

  components: {
    TotalHeader
  }
}
</script>

<style lang="scss">
</style>