<template>
  <section>
    <h1>こんにちは</h1>
    <nuxt-link to="login">ログイン</nuxt-link>
    <nuxt-link to="register">ユーザー認証</nuxt-link>
    <h1>{{ $auth.loggedIn }}</h1>
    <h1>{{ $auth.user }}</h1>
    <button @click="$auth.logout()">ログアウト</button>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
