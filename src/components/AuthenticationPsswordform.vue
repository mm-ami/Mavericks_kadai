<template>
  <ValidationProvider v-slot="{ errors }" tag="div" rules="required|min:4" class="password_form">
    <label for="password">パスワード</label>
    <input id="password" v-model="setPassword" name="パスワード" type="password">
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'PasswordForm',

  props: {
    password: {
      type: String,
      default: ''
    }
  },

  computed: {
    setPassword: {
      get() {
        return this.password;
      },
      set(inputPassword) {
        return this.$emit('update:password', inputPassword);
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.password_form {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 5px;
  }

  .error {
    color: #fc7e7e;
  }
}

</style>