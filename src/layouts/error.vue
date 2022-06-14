<template>
  <section class="error">
    <h2 v-if="error.statusCode === 404">
      ページが見つかりません。
    </h2>
    <h2 v-else>
      エラーが発生しました。少し時間を置いてから再度お試しください。
    </h2>
    <nuxt-link to="/">HOMEに戻る</nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',

  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

.error {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: $backcolor;
  padding: 50px;

  a {
    margin-top: 20px;
    display: inline-block;
    color: $keycolor;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>