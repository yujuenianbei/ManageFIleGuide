<template>
  <div class="musicList">
    <div class="musicListHeader">
      <i class="icons icon_t icon_music"></i>
      <a href class="musicTitle">音乐</a>
      <div class="musicTitleTab">
        <div
          v-for="(item, index) of list"
          :class="{active:selected==index, musicSelect:true}"
          :key="item.title"
          v-on:click="change(index)"
        >
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>

    <div
      :key="item.title"
      v-for="(item, index) of list"
      v-show="selected==index"
      :class="{active:selected==index, musicContent:true}"
    >
      <div
        class="musicListItem"
        v-for="(item, index) in musicData"
        :key="item.id"
        :class="{active: index == nowIndex}"
        v-on:mouseover="addActive($event, index)"
        v-on:mouseout="removeActive($event)"
      >
        <router-link :to="{path: '/musicPlay', query: { id: item.id}}">
          <!-- <div
          class="musicListImg"
          :style="{'background': 'url('+item.songimg+') no-repeat center center', 'backgroundSize': '100% 100%'}"
          :title="item.name"
          ></div>-->
          <img class="musicListImg" :src="item.img" alt>
          <div class="musicListInfo">
            <p class="name">{{item.name}}</p>
            <p class="num" :class="{infoShow: index == nowIndex}">
              <span>
                <i class="x-icon x-icon-play"></i>666
              </span>
              <span>
                <i class="x-icon x-icon-num"></i>124
              </span>
            </p>
          </div>
          <div class="musicListImgHover" v-show="nowIndex !== -1" v-if="index == nowIndex">
            <span>{{item.name}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ip } from '../../http';
import axios from "axios";
export default {
  data: function() {
    return {
      nowIndex: -1,
      info: null,
      musicData: [],
      selected: 0, //当前位置
      list: [
        {
          title: "有新动态"
        },
        {
          title: "最新投稿"
        }
      ]
    };
  },
  methods: {
    addActive($event, index) {
      // console.log(event.currentTarget.getAttribute('class'))
      this.nowIndex = index;
      // console.log(this.nowIndex)
    },
    removeActive($event) {
      this.nowIndex = -1;
    },
    showList($event) {
      console.log(event.target.getAttribute("class"));
    },
    change(index) {
      this.selected = index;
      if (index == 0) {
        axios.get(ip + "/front/musicList/newTrends").then(
          response => (
            (this.musicData = response.data.reqData.data),
            this.musicData.forEach(item => {
              item.img = ip + "/api/img/" + item.img;
              item.url = ip + "http://localhost:8081/#/videoPlay/" + item.url;
            })
          )
        );
      } else {
        axios.get("/front/musicList/newContribute").then(
          response => (
            (this.musicData = response.data.reqData.data),
            this.musicData.forEach(item => {
              item.img = ip + "/api/img/" + item.img;
              item.url = ip + "http://localhost:8081/#/videoPlay/" + item.url;
            })
          )
        );
      }
    }
  },
  mounted() {
    axios.get(ip + "/front/musicList/newTrends").then(
      response => (
        (this.musicData = response.data.reqData.data),
        this.musicData.forEach(item => {
          item.img = ip + "/api/img/" + item.img;
        })
      )
    );
  }
};
</script>
<style>
.infoShow{
  bottom: -25px !important;
}
.musicListInfo .name {
  padding-top: 8px;
  height: 40px;
  line-height: 20px;
  transition: all 0.2s linear;
  color: #222;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  text-align: left;
}
.musicListInfo .num {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 23px;
  line-height: 23px;
  color: #99a2aa;
  background-color: #fff;
  transition: all 0.3s;
  font-size: 0;
}
.musicListInfo p i {
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: top;
  margin-right: 5px;
}
.musicListInfo p span {
  line-height: 12px;
  height: 14px;
  display: inline-block;
  width: 50%;
  overflow: hidden;
  font-size: 12px;
  vertical-align: bottom;
  float: left;
}
.musicList {
  float: left;
  width: 1100px;
  height: 100%;
}
.musicListHeader {
  width: calc(100% - 20px);
  height: 35px;
}
.musicListItem {
  float: left;
  overflow: hidden;
  width: 200px;
  height: 112px;
  margin: 10px 10px 0px;
  position: relative;
}
.musicListImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.musicListImgHover {
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  background-color: #30313359;
  position: relative;
  margin-top: -112px;
}
.musicListImgHover span {
  color: #fff;
  position: absolute;
  bottom: 5px;
  right: 10px;
}
.musicListItem:nth-child(5n-4) {
  margin-left: 0px;
}
.icon_music {
  background-position: -140px -266px;
}
.musicTitle {
  font-size: 24px;
  line-height: 24px;
  font-weight: 400;
  margin-right: 20px;
  float: left;
  color: #222;
}
.musicTitle:hover {
  color: #00a1d6;
}
.musicContent {
  width: 100%;
  height: 100%;
}
.musicSelect {
  float: left;
  position: relative;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  padding: 1px 0 2px;
  border-bottom: 1px solid transparent;
  margin-left: 12px;
  transition: 0.2s;
  transition-property: border, color;
}
.musicTitleTab {
  float: left;
  margin: 0 10px 0 0;
}
.musicTitleTab .active {
  border-bottom: 1px solid #00a1d6;
}
.musicTitleTab .active > div {
  color: #00a1d6;
  transition: all 0.2s;
}
.musicTitleTab .active > div:before {
  transition: all 0.2s;
  content: "";
  position: relative;
  left: 65%;
  margin-left: -6px;
  bottom: -1px;
  width: 0;
  height: 0;
  border-bottom: 3px solid #00a1d6;
  border-top: 0;
  border-left: 3px dashed transparent;
  border-right: 3px dashed transparent;
}
</style>






