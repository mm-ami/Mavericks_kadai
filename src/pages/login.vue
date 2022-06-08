<template>
  <section>
    {{ error_message }}
    <login-register v-model="user" @login_btn="login"></login-register>
  </section>
</template>

<script>
import LoginRegister from "../components/RegisterLogin.vue";
export default {
  name: 'LoginPage',

  components: {
    LoginRegister
  },

  data() {
    return {
      user: {
        username: '',
        password: '',
        title: 'ログイン'
      },
      error_message: ''
    }
  },

  methods: {
    async login(e) {

      await this.$auth.loginWith("local", { data: e })

      .catch(() => {

        this.error_message = 'ユーザー名とパスワードの組み合わせが正しくありません。';
        
      })

    }
  }
}
</script>

<style>

</style>