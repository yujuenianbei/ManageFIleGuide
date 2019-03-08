<template>
  <div>
    <h1>{{aboutMsg}}</h1>
    <div>我是user组件, 动态部分是{{dynamicSegment}}</div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      aboutMsg: 'user 组件'
    }
  },
  computed: {
    dynamicSegment () {
      return this.$route.params.id
    }
  }
}
</script>
