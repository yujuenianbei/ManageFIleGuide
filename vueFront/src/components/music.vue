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
  name: "music",
  components: { RightAnchor, Music, Video },
  mounted() {
    document.title = "音乐";
  }
};
</script>
<style>
</style>

