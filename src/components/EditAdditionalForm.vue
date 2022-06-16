<template>
  <textarea name="memo" :value="memobody" @input="$emit('update:memobody', $event.target.value)"></textarea>
</template>

<script>
export default {
  name: 'EditAdditional',

  props: {
    memobody: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

textarea {
  resize: none;
  font-size: 2rem;
  padding: 10px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%);
  border: none;
  height: 500px;
  width: 550px;

  @include phone {
    height: 300px;
    width: 350px;
  }
}

</style>