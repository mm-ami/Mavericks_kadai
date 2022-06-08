<template>
  <section>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <form>
        <h2>{{userInfomation.title}}</h2>

        <ValidationProvider v-slot="{ errors }" rules="required" class="form__inner">
          <label for="username">ユーザー名</label>
          <input id="username" v-model="userInfomation.username" name="ユーザー名" type="text">
          <span id="error">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required|min:4" class="form__inner">
          <label for="password">パスワード</label>
          <input id="password" v-model="userInfomation.password" name="パスワード" type="password">
          <span id="error">{{ errors[0] }}</span>
        </ValidationProvider>
        
        <input v-if="userInfomation.title == '新規作成'" :disabled="invalid" type="submit" value="新規作成" @click.prevent="register_btn">

        <input v-else :disabled="invalid" type="submit" value="ログイン" @click.prevent="login_btn">
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  name: 'RegisterLoginComponent',

  // model: {
  //   prop: 'user',
  //   event: 'changeUser'
  // },

  // register.vue login.vue から渡ってきた値
  props: {
    value: {
      type: Object,
    }
  },

  computed: {
    userInfomation: {
      get() {
        return this.value
      },
      // set() {
      //   this.$emit("changevalue", this.value)
      // }
    }
  },

  methods: {
    register_btn() {
      this.$emit('register_btn', this.value)
    },
    login_btn() {
      this.$emit('login_btn', this.value)
    }
  },

}
</script>