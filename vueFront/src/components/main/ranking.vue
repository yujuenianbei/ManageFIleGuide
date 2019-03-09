<template>
  <div class="musicTop">
    <div class="musicTopHead">
      <div class="topName">排行</div>
      <ul>
        <li
          v-for="(item,index) of tabTitle"
          :class="{active:selected==index, musicTopList:true}"
          :key="item.title"
          v-on:mouseenter="change(index)"
        >
          <div>{{item.title}}</div>
        </li>
      </ul>
    </div>
    <div class="musicTopContent">
      <div
        :key="1"
        class="musicTopLeft"
        :class="{contentActive:selected==0, musicTopContentOne:true}"
      >
        <ul>
          <li :key="item.id" v-for="(item,index) of musicTop">
            <div class="musicTopContentNum">{{index + 1}}</div>
            <router-link v-if="index === 0" :to="{path: item.path, query: { id: item.id}}">
              <img class="musicTopOneImg" :src="item.img" alt>
              {{item.name}}
            </router-link>
            <router-link
              v-if="index !== 0"
              :to="{path: item.path, query: { id: item.id}}"
            >{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div
        :key="2"
        class="musicTopRight"
        :class="{contentActive:selected==1, musicTopContentOne:true}"
      >
        <ul>
          <li :key="item.id" v-for="(item,index) of musicNew">
            <div class="musicTopContentNum">{{index + 1}}</div>
            <router-link v-if="index === 0" :to="{path: item.path, query: { id: item.id}}">
              <img class="musicTopOneImg" :src="item.img" alt>
              {{item.name}}
            </router-link>
            <router-link
              v-if="index !== 0"
              :to="{path: item.path, query: { id: item.id}}"
            >{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="musicMore">查看更多</div>
  </div>
</template>
<script>
export default {
  props: ["musicTop", "tabTitle", "musicNew"],
  data: function() {
    return {
      selected: 0, //当前位置
      all: [{}]
    };
  },
  methods: {
    change(index) {
      this.selected = index;
    }
  },
  beforeMount() {
    console.log(this.musicTop, this.tabTitle, this.musicNew);
  }
};
</script>
<style>
.musicTop {
  float: left;
  height: 100%;
  width: 240px;
  overflow: hidden;
}
.musicTopOneImg {
  width: 70px;
  height: 70px;
}
.topName {
  font-size: 20px;
  font-weight: 500;
  height: 30px;
  width: 50px;
  float: left;
}
.musicTopHead {
  width: 100%;
  height: 30px;
}
.musicTopHead ul {
  width: calc(100% - 50px);
  float: left;
}
.musicTopHead ul > li {
  height: 20px;
}
.musicTopHead ul > li > div {
  height: 20px;
}
.musicTopList {
  cursor: pointer;
  float: left;
  text-align: center;
  margin-top: 5px;
  margin-right: 8px;
}
.musicTopHead .active > div {
  color: #00a1d6;
  transition: all 0.2s;
}
.musicTopHead .active > div::before {
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
.musicTopHead .active > div {
  border-bottom: 1px solid #00a1d6;
}

.musicTopContent {
  width: 480px;
  height: 355px;
  padding-top: 5px;
}
.contentActive {
  margin-left: 0 !important;
  transition: all 0.5s;
}
.musicTopLeft {
  width: 240px;
  height: 355px;
  float: left;
  margin-left: -240px;
  transition: all 0.5s;
}
.musicTopRight {
  width: 240px;
  height: 355px;
  float: left;
  transition: all 0.5s;
}
.musicTopContent ul > li {
  width: 100%;
  float: left;
  margin-bottom: 10px;
  line-height: 35px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.musicTopContent ul > li a {
  margin-left: 10px;
}
.musicTopContentNum {
  margin-top: 8px;
  line-height: 20px;
  float: left;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  background-color: #b8c0cc;
  color: #fff;
  text-align: center;
  vertical-align: middle;
}
.musicTopContent ul > li:first-child .musicTopContentNum{
  margin-top: 25px; 
}
.musicTopContent ul > li:nth-child(-n + 3) .musicTopContentNum {
  background-color: #f25d8e;
}
.musicMore {
  width: 100%;
  height: 30px;
  text-align: center;
  background: #e5e9ef;
  border-color: #e5e9ef;
  line-height: 30px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}
.musicMore:hover {
  background-color: #ccd0d7;
  border-color: #ccd0d7;
}
</style>