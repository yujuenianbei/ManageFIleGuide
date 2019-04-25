<template>
  <Raking v-if="this.videoTop !== null" :musicTop="videoTop" :tabTitle="list" :musicNew="videoNew"/>
</template>
<script>
import { ip } from '../../http';
import axios from "axios";
import Raking from "../main/ranking.vue";
export default {
  components: {
    Raking
  },
  data: function() {
    return {
      selected: 0, //当前位置
      list: [
        {
          title: "全部"
        },
        {
          title: "最新"
        }
      ],
      videoTop: null,
      videoNew: null
    };
  },
  methods: {},
  beforeCreate() {
    axios.get(ip + "/front/videoList/topSeven").then(
      response => (
        this.videoTop = response.data.reqData.data,
        this.videoTop.forEach(item => {
          item.path = "/videoPlay";
          item.img = ip + "/api/img/" + item.img;
        })
      )
    );
    axios.get(ip + "/front/videoList/newSeven").then(
      response => (
        this.videoNew = response.data.reqData.data,
        this.videoNew.forEach(item => {
          item.path = "/videoPlay";
          item.img = ip + "/api/img/" + item.img;
        })
      )
    );
  }
};
</script>
<style>
</style>

