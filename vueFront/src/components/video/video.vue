<template>
  <div class="video" id="video" href="video">
    <MusicList/>
    <MusicTop/>
  </div>
</template>
<script>
import MusicList from "./videoList.vue";
import MusicTop from "./videoTop.vue";
export default {
  name: "Video",
  components: { MusicList, MusicTop }
};
</script>
<style>
.video {
  width: 1340px;
  height: 2000px;
  margin-bottom: 30px;
}
</style>

