<template>
  <div class="music" id="music" href="music">
    <MusicList/>
    <MusicTop/>
  </div>
</template>
<script>
import MusicList from "./musicList.vue";
import MusicTop from "./musicTop.vue";
export default {
  name: "Music",
  components: { MusicList, MusicTop }
};
</script>
<style>
.music {
  width: 1340px;
  height: 440px;
  margin-bottom: 30px;
}
</style>

