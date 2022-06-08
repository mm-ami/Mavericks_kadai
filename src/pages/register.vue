<template>
  <section>
    <h1>{{ errorMessage }}</h1>
    <login-register v-model="user" @register_btn="register"></login-register>
  </section>
</template>

<script>
import LoginRegister from "../components/RegisterLogin.vue";
export default {
  name: 'RegisterPage',

  components: {
    LoginRegister
  },

  data() {
    return {
      user: {
        username: '',
        password: '',
        title: '新規作成'
      },
      errorMessage: ''
    }
  },

  methods: {
    async register(e) {
      await this.$axios.post('/authentication/register', e)
      .then((res) => {

        if(res.data.status === 401) return (this.errorMessage = res.data.message)

        if(res.status === 200) this.$auth.loginWith('local', {data: e})

      })
    }
  }
}
</script>

<style>

</style>