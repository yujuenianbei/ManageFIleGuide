<template>
  <div class="video" id="video" href="video">
    <VideoPlayer />
  </div>
</template>
<script>
import VideoPlayer from "../../elements/videoPlayer.vue";
export default {
  name: "VideoPlay",
  components: { VideoPlayer }
};
</script>
<style>
.video {
  width: 1340px;
  height: 2000px;
  margin-bottom: 30px;
}
</style>

