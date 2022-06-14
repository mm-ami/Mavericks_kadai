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

#header_container {
  margin: 0 30px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header_title {
    a {
      color: $basecolor;
      font-size: 3rem;
    }
}

  .header_nav {
    button {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}

</style>
