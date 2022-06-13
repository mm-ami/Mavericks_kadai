<template>
  <section class="login_register">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">

      <h2 class="login_register_title">ログイン</h2>
      <h4>{{ errorMessage }}</h4>
      <username-form :username.sync="userInformation.username"></username-form>
      <password-form :password.sync="userInformation.password"></password-form>

      <div class="login_register_nav">
        <input :disabled="invalid" class="submitbtn" type="submit" value="ログイン" @click.prevent="handleSubmit(loginBtn)">
        <nuxt-link to="register">新規作成</nuxt-link>
      </div>

    </ValidationObserver>
  </section>
</template>

<script>
import UsernameForm from "../../components/AuthenticationUsernameform.vue";
import PasswordForm from "../../components/AuthenticationPsswordform.vue";

export default {
  name: 'LoginPage',

  components: {
    UsernameForm,
    PasswordForm
  },

  data() {
    return {
      userInformation: {
        username: '',
        password: '',
      },
      errorMessage: ''
    }
  },

  methods: {
    // ログイン処理
    async loginBtn() {
      await this.$auth.loginWith("local", { data: this.userInformation })
      .catch(() => {
        this.errorMessage = 'ユーザー名とパスワードの組み合わせが正しくありません。';
      })
    }
  }
}
</script>

<style lang="scss">

</style>