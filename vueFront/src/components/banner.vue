<template>
  <div class="bannerImg" :style="{'background-image': 'url('+ banner +')'}">
    <div class="serachInput">
      <InputS />
      <ButtonS />
    </div>
  </div>
</template>
<script>
import { ip } from '../http';
import axios from "axios";
import InputS from '../elements/input.vue'
import ButtonS from '../elements/button.vue'
export default {
  components: { InputS, ButtonS },
  data: function() {
    return {
      banner: null,
      Llist: [
        {
          name: "主站",
          id: 1,
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "音频",
          id: 2,
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "视频",
          id: 3,
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "论坛",
          id: 4,
          url: "https://www.bilibili.com/video/av23032457"
        }
      ]
    };
    
  },
  mounted() {
    axios.get(ip + "/api/imgList/1").then(
      response => (
        response.data.reqData.imgTypeList.forEach(item => {
          item.img_img = ip + "/api/img/" + item.img_img;
          this.banner = item.img_img
        })
      )
    );
  },
  methods: {
    addActive($event) {
      $event.currentTarget.className = "userTopActive toplist userTopList";
    },
    removeActive($event) {
      $event.currentTarget.className = " toplist userTopList";
    },
    showCombActive($event) {
      $event.currentTarget.className = "combTopActive toplist combTopList";
    },
    removeCombActive($event) {
      $event.currentTarget.className = "toplist combTopList";
    }
  }
};
</script>

<style>
.bannerImg {
  position: absolute;
  top: 0;
  height: 170px;
  min-width: 1440px;
  width: 100%;
  background-position: center -10px;
  background-repeat: no-repeat;
}
.serachInput {
  top: 120px;
  position: absolute;
  right: 200px;
}
</style>
