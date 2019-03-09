<template>
  <div class="MusicBottomPlayer">
    <div class="MusicOnOff" @click="playerToggle()">
      <i class="icons" :class="{playerOn: playerOn, playerOff: !playerOn}"></i>
    </div>
    <div class="MusicBottomPlayer-content">
      <div class="MusicBottomPlayer-controller">
        <div class="MusicBottomPlayer-controllerBtn">
          <i class="playBtn prv"></i>
        </div>
        <div class="MusicBottomPlayer-controllerBtn">
          <i @click="playSong()" class="playBtn" :class="{ pause: playState, ply: !playState }"></i>
        </div>
        <div class="MusicBottomPlayer-controllerBtn">
          <i class="playBtn nxt"></i>
        </div>
      </div>
      <div class="MusicBottomPlayer-img">
        <img :src="songImg" alt>
      </div>
      <div class="MusicBottomPlayer-songInfo">
        <div class="MusicBottomPlayer-songName">
          <div class="MusicBottomPlayer-songTitle">{{songTitle}}</div>
          <div class="MusicBottomPlayer-songAuthor">{{songAuthor}}</div>
          <div class="MusicBottomPlayer-time">{{currentTime}}/{{duration}}</div>
        </div>
        <div class="MusicBottomPlayer-progress">
          <ProgressS
            v-on:childByValue="childByValue"
            :height_out_y="prgheight"
            :backgroundcolor_out_y="prgbgColor"
            :width_on_y="prgInWidth"
            :buffered_width="bufferWidth"
          />
        </div>
      </div>
      <div class="MusicBottomPlayer-rightControll">
        <div class="MusicBottomPlayer-controllerBtn">
          <i class="playBtn vol"></i>
        </div>
      </div>
    </div>
    <audio id="audioPlayer" ref="audio" controls="controls" loop="{true}" preload="metadata">
      <source :src="songSource" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import ProgressS from "../elements/progress.vue";
export default {
  name: "MusicPlayer",
  components: { ProgressS },
  data: function() {
    return {
      playerOn: true,
      playState: false,
      prgbgColor: "#f5f5f5",
      prgheight: "6px",
      prgInWidth: 0,
      bufferWidth: 0,
      duration: "00:00",
      currentTime: "00:00",
      timer: null,
      songTitle: "Inspire",
      songAuthor: "Capo Productions",
      songImg: "http://localhost:3000/api/img/Inspire.jpg",
      songSource:
        "http://localhost:3000/api/music/5%20Reasons%20-%20In%20My%20Mind(Original%20Mix).mp3"
    };
  },
  methods: {
    playerToggle() {
      if (this.playerOn) {
        document.getElementsByClassName("MusicBottomPlayer")[0].style.bottom =
          "-50px";
        document.getElementsByClassName("MusicOnOff")[0].style.marginTop =
          "-30px";
      } else {
        document.getElementsByClassName("MusicBottomPlayer")[0].style.bottom =
          "0px";
        document.getElementsByClassName("MusicOnOff")[0].style.marginTop =
          "10px";
      }
      this.playerOn = !this.playerOn;
    },
    // 时间转换
    secondToDate(result) {
      var m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      var s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      return (result = m + ":" + s);
    },
    // 播放/暂停
    playSong($event) {
      let duration = Math.floor(
        document.getElementsByTagName("audio")[0].duration
      ); //总时长
      let currentTime = Math.floor(
        document.getElementsByTagName("audio")[0].currentTime
      ); //当前时间
      if (this.playState) {
        document.getElementsByTagName("audio")[0].pause();
        clearInterval(this.timer);
      }
      if (!this.playState) {
        document.getElementsByTagName("audio")[0].play();
        console.log(currentTime);
        this.timer = setInterval(() => {
          currentTime = Math.floor(
            document.getElementsByTagName("audio")[0].currentTime
          );
          this.prgInWidth = (currentTime / duration) * 100 + "%";
          this.currentTime = this.secondToDate(currentTime);
          this.duration = this.secondToDate(duration);
          this.bufferWidth = (document.getElementsByTagName("audio")[0].buffered.end(0)/duration) * 100 + "%";             
          console.log(document.getElementsByTagName("audio")[0].buffered.end(0))
        }, 100);
      }
      this.playState = !this.playState;
    },
    // 子组件方法
    childByValue: function(childValue) {
      this.prgInWidth = childValue;
      document.getElementsByTagName("audio")[0].currentTime =
        childValue *
        Math.floor(document.getElementsByTagName("audio")[0].duration);
      // childValue就是子组件传过来的值
      // console.log(document.getElementsByTagName("audio")[0].currentTime);
    }
  },
  mounted() {
    document.title = "视频播放";
  }
};
</script>

<style>
.playBtn {
  cursor: pointer;
  display: inline-block;
  background-image: url("../../static/playbar.png");
}
.playerOn {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-position: -656px -82px;
  transform: rotate(180deg);
}
.playerOff {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-position: -656px -82px;
}
.prv {
  width: 28px;
  height: 28px;
  background-position: 0 -130px;
  margin-left: 4px;
  margin-top: 4px;
}
.prv:hover {
  background-position: -30px -130px;
}
.pause {
  width: 36px;
  height: 36px;
  background-position: 0 -165px;
}
.pause:hover {
  background-position: -40px -165px;
}
.ply {
  width: 36px;
  height: 36px;
  background-position: 0 -204px;
}
.ply:hover {
  background-position: -40px -204px;
}
.nxt {
  width: 28px;
  height: 28px;
  background-position: -80px -130px;
  margin-top: 4px;
  margin-left: 4px;
}
.nxt:hover {
  background-position: -110px -130px;
}
.vol {
  float: left;
  width: 25px;
  height: 25px;
  margin: 5px 0px 0 0;
  text-indent: -9999px;
  background-position: -2px -248px;
}
.vol:hover {
  background-position: -31px -248px;
}

.MusicOnOff {
  position: absolute;
  right: 0;
  margin-top: 10px;
  width: 30px;
  height: 30px;
  transition: all 1s ease;
}
.MusicBottomPlayer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #00000085;
  transition: all 1s ease;
}
.MusicBottomPlayer-content {
  max-width: 1440px;
  height: 50px;
  margin: 0 auto;
}
.MusicBottomPlayer-controller {
  float: left;
  position: relative;
  width: 120px;
  height: 100%;
}
.MusicBottomPlayer-controllerBtn {
  float: left;
  margin-top: 8px;
  width: 36px;
  height: 50px;
}
.MusicBottomPlayer-img {
  float: left;
  width: 50px;
  height: 100%;
}
.MusicBottomPlayer-img img {
  width: 100%;
  height: 100%;
}
.MusicBottomPlayer-songInfo {
  float: left;
  width: 800px;
  height: 50px;
  margin-left: 15px;
}
.MusicBottomPlayer-songName {
  float: left;
  margin-top: 5px;
  color: #fff;
  width: 100%;
}
.MusicBottomPlayer-songTitle {
  float: left;
  margin-right: 20px;
}
.MusicBottomPlayer-songAuthor {
  float: left;
}
.MusicBottomPlayer-time {
  float: right;
}
.MusicBottomPlayer-progress {
  float: left;
  width: 800px;
}
.MusicBottomPlayer-rightControll {
  float: left;
  margin-left: 10px;
  height: 50px;
  width: 400px;
}
#audioPlayer {
  display: none;
}
</style>

