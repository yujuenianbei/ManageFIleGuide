<template>
  <div>
    <RightAnchor/>
    <Music/>
    <Video/>
  </div>
</template>

<script>
import RightAnchor from "./rightAnchor.vue";
import Music from "./music/music.vue";
import Video from "./video/video.vue";
export default {
  name: "video",
  components: { RightAnchor, Music, Video },
  mounted() {
    document.title = "视频";
  }
};
</script>
<style>
</style>

