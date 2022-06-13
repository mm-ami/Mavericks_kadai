<template>
  <textarea v-model="setMemobody" name="memo" cols="50" rows="15"></textarea>
</template>

<script>
export default {
  name: 'EditAdditional',

  props: {
    memobody: {
      type: String,
      default: ''
    }
  },

  computed: {
    setMemobody: {
      get () {
        return this.memobody;
      },
      set (inputMemoBody) {
        return this.$emit('update:memobody', inputMemoBody) ;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>