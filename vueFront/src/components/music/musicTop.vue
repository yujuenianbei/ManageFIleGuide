<template>
  <Raking v-if="this.musicTop !== null" :musicTop="musicTop" :tabTitle="list" :musicNew="musicNew"/>
</template>
<script>
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
      musicTop: null,
      musicNew: null
    };
  },
  methods: {},
  beforeCreate() {
    axios.get("http://localhost:3000/front/musicList/topSeven").then(
      response => (
        this.musicTop = response.data.reqData.data,
        this.musicTop.forEach(item => {
          item.path = "/musicPlay";
          item.img = "http://localhost:3000/api/img/" + item.img;
        })
      )
    );
    axios.get("http://localhost:3000/front/musicList/newSeven").then(
      response => (
        this.musicNew = response.data.reqData.data,
        this.musicNew.forEach(item => {
          item.path = "/musicPlay";
          item.img = "http://localhost:3000/api/img/" + item.img;
        })
      )
    );
  }
};
</script>
<style>
</style>

