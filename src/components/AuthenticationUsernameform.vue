<template>
  <ValidationProvider v-slot="{ errors }" tag="div" rules="required" class="username_form">
    <label for="username">ユーザー名</label>
    <input id="username" v-model="setUsername" name="ユーザー名" type="text">
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'UsernameForm',

  props: {
    username: {
      type: String,
      default: ''
    }
  },

  computed: {
    setUsername: {
      get() {
        return this.username;
      },
      set(inputUsername) {
        return this.$emit('update:username', inputUsername);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.username_form {
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