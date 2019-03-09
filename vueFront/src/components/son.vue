<template>
    <div>
        <h1>{{data.a}}</h1>
        <h2>{{name.b}}</h2>
        <button @click="jia()">+</button>
    </div>
</template>
<script>
export default {
    props:["data","name"],
    data: function(){
        return {

        }
    },
    methods:{
        jia(){
            console.log(this.data);
            this.data.a++;
        }
    }
}
</script>
<style>

</style>
