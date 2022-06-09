<template>
  <section>
    <h1>こんにちは</h1>
    <nuxt-link to="login">ログイン</nuxt-link>
    <nuxt-link to="register">ユーザー認証</nuxt-link>
    <h1>{{ $auth.loggedIn }}</h1>
    <h1>{{ $auth.user }}</h1>
    <button @click="$auth.logout()">ログアウト</button>
    <button @click="add_memo_btn">メモを追加</button>
    <button @click="edit_btn">編集</button>

    <client-only>
      <vue-final-modal v-model="edit_additional_screen" style="background-color: rgba(0,0,0,.3); cursor: pointer">
        <edit-additional></edit-additional>
      </vue-final-modal>
    </client-only>

  </section>
</template>

<script>
import EditAdditional from "../components/EditAdditionalForm.vue";

export default {
  name: 'IndexPage',

  components: {
    EditAdditional
  },

  data() {
    return {
      edit_additional_screen: false
    }
  },

  methods: {
    edit_btn() {
      this.edit_additional_screen = true
    },
    add_memo_btn() {
      this.edit_additional_screen = true
    }
  }
}
</script>
