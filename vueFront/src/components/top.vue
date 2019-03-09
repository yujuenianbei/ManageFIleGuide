<template>
  <div id="myapp">
    <div class="list">
      <div class="l-list">
        <ul>
          <li v-for="(item) in Llist" :key="item.id" class="toplist">
            <a v-bind:href="item.url">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="r-list">
        <ul>
          <li
            v-bind:class="['toplist', 'userTopList']"
            v-on:mouseover="addActive($event)"
            v-on:mouseout="removeActive($event)"
          >
            <a class="userTopA" :href="'https://www.bilibili.com/video/av23032457'">
              <div class="userTop">
                <img
                  class="userImg"
                  src="https://i1.hdslb.com/bfs/face/a449a26178145847384407085fe037c96c5ba8b0.jpg@72w_72h.webp"
                >
              </div>
            </a>
            <div class="userInfo"></div>
          </li>
          <li v-bind:class="['toplist', 'msgTopList']">
            <a :href="'https://www.bilibili.com/video/av23032457'">消息</a>
          </li>
          <li v-bind:class="['toplist', 'favTopList']">
            <a :href="'https://www.bilibili.com/video/av23032457'">收藏夹</a>
          </li>
          <li
            v-bind:class="['toplist', 'combTopList']"
            v-on:mouseover="showCombActive($event)"
            v-on:mouseout="removeCombActive($event)"
          >
            <a :href="'https://www.bilibili.com/video/av23032457'">
              <i class="el-icon-delete"></i>
              投稿
            </a>
            <div class="combInfo">
              <ul>
                <li v-for="(item) in combList" :key="item.id" class="combTopListInfo">
                  <a v-bind:href="item.url">
                    <i :class="[item.iconclass]"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
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
      ],
      combList: [
        {
          name: "音频投稿",
          id: 1,
          iconclass: "el-icon-service",
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "视频投稿",
          id: 2,
          iconclass: "el-icon-mobile-phone",
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "投稿管理",
          id: 3,
          iconclass: "el-icon-edit-outline",
          url: "https://www.bilibili.com/video/av23032457"
        }
      ]
    };
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
#myapp {
  width: 100%;
  height: 42px;
  position: relative;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 128px;
  background-color: hsla(0, 0%, 100%, 0.4);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
#myapp .ul {
  height: 42px;
}
.list {
  margin: 0 auto;
  max-width: 1440px;
  height: 42px;
}
.l-list {
  float: left;
  margin: 0 auto;
  max-width: 720px;
  height: 42px;
}
.r-list {
  float: right;
  margin: 0 auto;
  max-width: 720px;
  height: 42px;
}
.userTop {
  position: relative;
  z-index: 20;
  width: 36px;
  height: 36px;
  top: 0;
  transition: 0.3s;
  background-color: hsla(0, 0%, 100%, 0) !important;
}
.userTopA {
  background-color: hsla(0, 0%, 100%, 0) !important;
}

/* 用户 */
.userTopActive {
  transition: 0.3s;
}
.userTopActive img {
  position: absolute;
  left: -15px;
  border: 2px solid #fff;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 50%;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.userTopActive .userTop {
  top: 15px;
}
.userImg {
  position: absolute;
  border: 0 solid #fff;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0) !important;
  transition: 0.3s;
}
.userInfo {
  border: 1px solid #ccc;
  display: none;
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #fff !important;
  margin-left: -75px;
  transition: 0.3s;
}
.userTopList {
  width: 50px;
  margin-right: 20px;
}
.userTopList:hover .userInfo {
  display: block;
}

/* 投稿  */
.combTopList {
  background-color: #f45a8d !important;
  transition: 0.3s;
  height: 47px !important;
  border-radius: 0 0 4px 4px;
}
.combTopList a {
  font-size: 16px;
  color: #fff;
  padding: 0px 15px;
}
.combInfo li {
  width: calc(100% / 3);
  float: left;
}
.combInfo {
  z-index: 1;
  display: none;
  position: absolute;
  width: 300px;
  height: 70px;
  background-color: #fff !important;
  right: 0;
  top: 42px;
  transition: 0.3s;
}
.combInfo ul,
.combInfo ul>li {
  height: 100%;
}
.combInfo li:hover {
  background: #e5e9ef;
}
.combInfo li:hover a i {
  font-size: 22px;
  margin: 0px auto -4px;
  transition: 0.2s;
  padding: 13px 0px 0px;
}

.combInfo a {
  height: 100%;
  font-size: 12px;
  color: #222;
  padding: 0;
}
.combInfo a i {
  color: #f45a8d;
  display: block;
  width: 20px;
  height: 20px;
  margin: 0px auto -8px;
  transition: 0.2s;
  padding: 17px 0px 0px;
  font-size: 20px;
}
.combInfo li a {
  color: #f45a8d;
}
.combTopList:hover .combInfo {
  display: block;
  z-index: 999;
}

.toplist {
  float: left;
  text-align: center;
  line-height: 42px;
  height: 100%;
  position: relative;
  background-color: hsla(0, 0%, 100%, 0);
  transition: 0.3s;
}
.toplist :hover {
  background-color: hsla(0, 0%, 100%, 0.3);
  transition: 0.3s;
}
#myapp a {
  height: 100%;
  display: block;
  padding: 0 12px;
}
</style>
