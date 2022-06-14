<template>
  <section class="add_container">
    <edit-additional :memobody.sync="memobodyAndUserId.memobody"></edit-additional>
    <input type="submit" value="メモを追加" @click.prevent="addMemo">
  </section>
</template>

<script>
import EditAdditional from "../components/EditAdditionalForm.vue";

export default {
  name: 'MemoAdd',

  components: {
    EditAdditional
  },

  middleware: 'auth',

  data() {
    return {
      memobodyAndUserId: {
        memobody: '',
        userId: this.$auth.user.user.id
      }
    }
  },

  methods: {
    // メモを追加
    async addMemo() {
      await this.$axios.post("/add", this.memobodyAndUserId)
      .then((res) => {
        this.$router.push("/");
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.add_container {
  @include transform;

  input {
    @include input;

    &:hover {
      @include inputhover;
    }
  }
}

</style>