<template>
  <section class="login_register">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">

      <h2 class="login_register_title">新規作成</h2>
      <h4>{{ errorMessage }}</h4>

      <username-form :username.sync="userInformation.username"></username-form>
      <password-form :password.sync="userInformation.password"></password-form>

      <div class="login_register_nav">
        <input :disabled="invalid" class="submitbtn" type="submit" value="新規作成" @click.prevent="handleSubmit(registerBtn)">
        <nuxt-link to="login">ログイン</nuxt-link>
      </div>

    </ValidationObserver>
  </section>
</template>

<script>
import UsernameForm from "~/components/AuthenticationUsernameForm.vue";
import PasswordForm from "~/components/AuthenticationPsswordForm.vue";

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
    // 新規作成処理
    async registerBtn() {
      await this.$axios.post('/authentication/register', this.userInformation)
      .then((res) => {

        if(res.data.status === 401) return (this.errorMessage = res.data.message);

        if(res.status === 200) this.$auth.loginWith('local', {data: this.userInformation});

      })
    }
  }
}
</script>

<style>

</style>