<template>
  <div class="rightAnchor">
    <div class="rightAnchorList">
      <div v-for="(item, index) in Rlist" :key="index">
        <a :href="item.url">{{item.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  method: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(document.body.scrollTop);
    }
  },
  data: function() {
    return {
      Rlist: [
        {
          name: "主站",
          url: "https://www.bilibili.com/video/av23032457"
        },
        {
          name: "音频",
          url: "#music"
        },
        {
          name: "视频",
          url: "#video"
        },
        {
          name: "论坛",
          url: "https://www.bilibili.com/video/av23032457"
        }
      ]
    };
  },
};
</script>
<style>
.rightAnchor {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 232px;
  margin-left: 630px;
  transition: top 0.3s;
}
.rightAnchorList {
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  background: #f6f9fa;
}
.rightAnchorList div {
  width: 48px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  -ms-user-select: none;
  user-select: none;
}
.rightAnchorList div:hover {
  background-color: #00a1d6;
}
.rightAnchorList div:hover a {
  color: #fff;
}
</style>

