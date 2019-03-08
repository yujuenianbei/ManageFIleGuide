<template>
  <div>
    <p>{{aboutMsg}}</p>
  </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      aboutMsg: '我是about 组件'
    }
  }
}
</script>
