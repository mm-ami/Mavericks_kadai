<template>
  <section>
    <div class="no_login">
      <h1>Memo</h1>
      <nuxt-link to="authentication/login">ログイン画面へ</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted() {
    if(this.$auth.loggedIn) {
      this.$router.push("/loginAfter");
    }
  }
}
</script>

<style lang="scss" scoped>

.no_login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: $backcolor;
  padding: 70px;

  h1 {
    font-size: 3rem;
  }

  a {
    display: block;
    color: $keycolor;
    font-size: 1.3rem;

    &:hover {
      text-decoration: underline;
    }
  }

  h1, a {
    text-align: center;
  }
}
</style>
