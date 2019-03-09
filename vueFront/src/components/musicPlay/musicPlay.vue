<template>
  <div class="musicPlay" id="music" href="music">
    <MusicPlayer/>
  </div>
</template>
<script>
import MusicPlayer from "../../elements/musicPlayer.vue";
export default {
  name: "MusicPlay",
  components: { MusicPlayer },
  mounted() {
    document.title = "音乐播放";
  }
};
</script>
<style>
#musicPlay {
  width: 1340px;
  height: 2000px;
  margin-bottom: 30px;
}
</style>

