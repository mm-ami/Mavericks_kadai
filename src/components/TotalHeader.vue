<template>
  <section id="header_container">

    <div class="header_title">
      <nuxt-link to="/">Memo</nuxt-link>
    </div>

    <div v-if="$auth.loggedIn" class="header_nav">
      <button @click="$auth.logout()">ログアウト</button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>

</style>
