<template>
    <son :data="data" :name="name"></son>
</template>
<script>
import son from "./son.vue"
export default {
    data:function(){
        return {
            data:{
                a:1
            },
            name:{
                b:2
            }
        }
    },
    components:{
        son
    }
}
</script>
<style>

</style>

