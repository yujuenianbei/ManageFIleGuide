<template>
  <div class="header">
    <ul>
      <li
        v-for="(item, index) in Llist"
        :key="item.id"
        class="header-li"
        :class="{active: index == nowIndex}"
        v-on:mouseover="addActive($event, index)"
        v-on:mouseout="removeActive($event)"
      >
        <router-link v-if="item.id === 1" to="/home">
          <div class="header-num">
            <i class="el-icon-edit"></i>
          </div>
          {{item.name}}
        </router-link>

        <router-link v-if="item.id !== 1" :to="{path: item.url}">
          <div class="header-num">
            <span class="span">{{item.num}}</span>
          </div>
          {{item.name}}
        </router-link>
        <ul class="onn" v-show="nowIndex == 1" v-if="index == 1">
          <li v-for="(items, index) in music" :key="index">
            <router-link class="listA" :to="{path: items.url}">
              <span>{{items.name}}</span>
            </router-link>
          </li>
        </ul>
        <ul class="onn" v-show="nowIndex == 2" v-if="index == 2">
          <li v-for="(items, index) in video" :key="index">
            <router-link class="listA" :to="{path: items.url}">
              <span>{{items.name}}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="gif">
      <a href="https://www.baidu.com" target="_blank" title="买买买">
        <img src="https://i0.hdslb.com/bfs/archive/9cb4b7e3bb13452787285b88cd2cf46f011426f8.gif" alt="">
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      nowIndex: 0,
      dropdownActive: false,
      Llist: [
        {
          name: "主站",
          id: 1,
          num: 100,
          url: "/home"
        },
        {
          name: "音频",
          id: 2,
          num: 100,
          url: "/music"
        },
        {
          name: "视频",
          id: 3,
          num: 100,
          url: "/video"
        },
        {
          name: "论坛",
          id: 4,
          num: 100,
          url: "/videoPlay"
        }
      ],
      music: [
        {
          name: "华语",
          id: 1,
          num: 100,
          url: "/music"
        },
        {
          name: "日韩",
          id: 2,
          num: 100,
          url: "/music"
        },
        {
          name: "欧美",
          id: 3,
          num: 100,
          url: "/music"
        }
      ],
      video: [
        {
          name: "mv",
          id: 1,
          num: 100,
          url: "/video"
        },
        {
          name: "电视剧",
          id: 2,
          num: 100,
          url: "/video"
        },
        {
          name: "电影",
          id: 3,
          num: 100,
          url: "/video"
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
      this.nowIndex = 0;
    },
    showList($event) {
      console.log(event.target.getAttribute("class"));
    }
  }
};
</script>

<style>
.header {
  margin: 0 auto;
  max-width: 1440px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0);
}
.header-li {
  float: left;
  width: 48px;
  display: block;
  margin: 0px 0px;
  text-align: center;
  position: relative;
  padding: 4px 0px;
}
.header-li a {
  font-size: 14px;
}
.header-num {
  padding-top: 5px;
  left: 0;
  height: 14px;
  width: 100%;
  text-align: center;
}
.header-li .span {
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  transform: scale(0.85);
  color: #fff;
  background-color: #ffafc9;
  border-radius: 3px;
  height: 12px;
  line-height: 14px;
  max-width: 28px;
  padding: 1px 3px;
}
.onn {
  position: absolute;
  margin-top: 4px;
  min-width: 120px;
  left: 0;
  overflow: hidden;
  background: #fff;
  border: 1px solid\9;
  border-top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 0 0 4px 4px;
  z-index: 2;
}
.onn > li {
  position: relative;
  font-size: 12px;
  line-height: 20px;
  min-width: 120px;
  height: auto;
  overflow: hidden;
  text-align: left;
  transition: all 0.2s;
}
.onn > li:hover {
  background-color: #e5e9ef;
  min-width: 100px;
}
.onn li:hover .listA {
  left: 5px;
}
.onn li:hover .listA span::after {
  right: -21px;
  opacity: 1;
}
.onn li .listA span::after {
  content: "";
  background: url(../../static/icons2.png) no-repeat 0 -1581px;
  width: 15px;
  height: 18px;
  display: block;
  position: absolute;
  right: -100px;
  top: 0px;
  transition: all 0.2s;
  opacity: 0;
}
.onn li .listA span{
  position: relative;
}
.onn .listA {
  display: block;
  padding: 5px 15px 5px 25px;
  margin-right: 10px;
  background: url(../../static/icons2.png) no-repeat 12px -1613px;
  white-space: nowrap;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  left: 0;
  color: #222;
}
.header .gif{
  float: right;
}
.header .gif>a{
  margin: 4px 0;
}
</style>