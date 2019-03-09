<template>
  <div id="app">
    <Top/>
    <Banner/>
    <Header/>
    <div class="content">
      <router-view></router-view>
    </div>
    <MusicPlayer/>
  </div>
</template>

<script>
import Top from "./components/top.vue";
import Banner from "./components/banner.vue";
import Header from "./components/headerList.vue";
import MusicPlayer from "./components/musicPlayer.vue";
export default {
  name: "App",
  components: { Top, Banner, Header, MusicPlayer },
};
</script>
<style>
.content {
  margin: 10px auto 0px;
  max-width: 1440px;
}
.icons {
  display: inline-block;
  background-image: url("../static/icons.png");
}
.icon_t {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
  float: left;
  margin-top: -10px;
}
</style>

