


<template>
    <div class="wrapper" >
         <div class="nav-item" :class='{active: index == nowIndex}' v-for='(tabItem,index) in tabParams' @click='tabToggle(index)'>
             <span :class='{dropdownBtn: index == 0}'  @click='dropdown'>{{tabItem}}</span>
             <ul v-if='index == 0' class="dropdownWrapper" v-show='dropdownActive'>
                <li v-for='(item, index) in dropParams'>{{item}}</li>
            </ul>
         </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nowIndex: 0,
                dropdownActive: false,
                tabParams: ['政治', '娱乐', '体育', '搞笑'],
                dropParams: ['亚洲', '北美洲', '欧洲', '非洲']
            }
        },
        methods: {
            dropdown: function(){
                console.log(event.target.getAttribute('class'))
                if(event.target.getAttribute('class') === 'dropdownBtn') {
                    this.dropdownActive = !this.dropdownActive;
                }
            },
            tabToggle: function(index){
                this.nowIndex = index;
                if(index === 0){
                    return
                }else {
                    this.dropdownActive = false;
                }
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper>div {
        flex: 1;
        text-align: center;
        height: 36px;
        line-height: 36px;
    }
    .dropdownWrapper {
        /*margin-top: 36px;*/
        border: 1px solid #2C3E50;
        font-size: 14px;
    }
    .dropdownWrapper li {
        display: block;
    }

    .nav-item.active {
        background: #e3e3d3;
    }
    .dropdownBtn {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .nav-item {
        cursor: pointer;
    }
</style>