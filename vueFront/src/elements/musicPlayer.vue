<template>
  <div class="MusicPlayer">
    <div class="MusicPlay-bg" :style="{backgroundImage:'url('+songImg+')'}"></div>
    <div class="MusicPlayer-info">
      <div class="MusicPlayer-img">
        <img
          :src="songImg"
          :style="{transform: 'rotate(' + 10 * currentRote + 'deg)'}"
          :class="{musicOn: playState}"
        >
        <div class="MusicPlayer-img-border"></div>
      </div>
      <div class="MusicPlayer-lyric">
        <div class="nolyric-content" v-if="!lyricState">
          <span class="no-lyric">{{noLyric}}</span>
        </div>
        <ul
          ref="lyrics"
          class="lyric-content"
          v-if="lyricState"
          :style="{marginTop: (-25*nowIndex + 100) +'px'}"
        >
          <li
            :class="{lyric_now: i === nowIndex}"
            :key="item.i"
            v-for="(item, i) of lyricArray"
          >{{item.lyric}}</li>
        </ul>
      </div>
    </div>
    <div class="MusicPlayer-content">
      <div class="MusicPlayer-controller">
        <div class="MusicPlayer-controllerBtn">
          <i class="fa fa-icons fa-step-backward"></i>
        </div>
        <div class="MusicPlayer-controllerBtn">
          <i
            @click="playSong()"
            class="fa fa-icons"
            :class="{ 'fa-pause': playState, 'fa-play': !playState }"
          ></i>
        </div>
        <div class="MusicPlayer-controllerBtn">
          <i class="fa fa-icons fa-step-forward"></i>
        </div>
      </div>
      <div class="MusicPlayer-songInfo">
        <div class="MusicPlayer-songName">
          <div class="MusicPlayer-songTitle">{{songTitle}}</div>
          <div class="MusicPlayer-songAuthor">{{songAuthor}}</div>
          <div class="MusicPlayer-time">{{currentTime}}/{{duration}}</div>
        </div>
        <div class="MusicPlayer-progress">
          <ProgressS
            v-on:childByValue="childByValue"
            :height_out_y="prgheight"
            :backgroundcolor_out_y="prgbgColor"
            :width_on_y="prgInWidth"
            :buffered_width="bufferWidth"
          />
        </div>
      </div>
      <div class="MusicPlayer-rightControll">
        <div class="MusicPlayer-controllerBtn">
          <i class="fa fa-icons fa-volume-up"></i>
        </div>
      </div>
    </div>
    <audio id="audioPlayer" ref="audio" controls="controls" loop="{true}" preload="metadata">
      <source :src="songSource" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import { ip } from '../http';
import ProgressS from "../elements/progress.vue";
import axios from "axios";
export default {
  name: "MusicPlayer",
  components: { ProgressS },
  data: function() {
    return {
      playerOn: true,
      playState: false,
      lyricState: true,
      noLyric: "暂无歌词",
      // 当前第几行
      nowIndex: 0,
      //
      currentRote: 0,
      prgbgColor: "#f5f5f5",
      prgheight: "6px",
      prgInWidth: 0,
      bufferWidth: 0,
      // 时间
      duration: "0:00",
      currentTime: "0:00",
      currentTimeSecond: "0",
      timer: null,
      // 歌曲信息
      songTitle: "Inspire",
      songAuthor: "Capo Productions",
      songImg: ip + "/api/img/Inspire.jpg",
      songSource:
        ip + "/api/music/5%20Reasons%20-%20In%20My%20Mind(Original%20Mix).mp3",
      lyric: "",
      lyricArray: [
        {
          time: 0,
          lyric: "none"
        },
        {
          time: 1,
          lyric: "none"
        }
      ]
    };
  },
  methods: {
    playerToggle() {
      if (this.playerOn) {
        document.getElementsByClassName("MusicPlayer")[0].style.bottom =
          "-50px";
        document.getElementsByClassName("MusicOnOff")[0].style.marginTop =
          "-30px";
      } else {
        document.getElementsByClassName("MusicPlayer")[0].style.bottom = "0px";
        document.getElementsByClassName("MusicOnOff")[0].style.marginTop =
          "10px";
      }
      this.playerOn = !this.playerOn;
    },
    // 时间转换
    secondToDate(result) {
      var m =
        Math.floor((result / 60) % 60) < 10
          ? Math.floor((result / 60) % 60)
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
        // console.log(currentTime);
        this.timer = setInterval(() => {
          currentTime = Math.floor(
            document.getElementsByTagName("audio")[0].currentTime
          );
          this.prgInWidth = (currentTime / duration) * 100 + "%";
          this.currentRote = currentTime;
          this.currentTimeSecond = currentTime;
          this.currentTime = this.secondToDate(currentTime);
          this.duration = this.secondToDate(duration);
          this.bufferWidth =
            (document.getElementsByTagName("audio")[0].buffered.end(0) /
              duration) *
              100 +
            "%";
          if (currentTime === 0) {
            this.nowIndex = 0;
          }
          // console.log(
          //   document.getElementsByTagName("audio")[0].buffered.end(0)
          // );
        }, 100);
      }
      this.playState = !this.playState;
    },
    // 时间转换成秒
    timeSecond(t) {
      return (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3);
    },
    // 显示歌词
    showLyric() {
      // console.log(this.lyric);
      const lyric_line = this.lyric.split("\n");
      this.lyricArray = [];
      lyric_line.map((item, i) => {
        var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
        this.lyricArray.push({
          time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
          lyric: item.substring(item.indexOf("]") + 1, item.length)
        });
      });
    },
    // 文字滚动
    lyricNow() {
      // console.log(
      //   this.timeSecond(this.currentTime),
      //   this.lyricArray[this.nowIndex + 1].time,
      //   this.nowIndex,
      //   isNaN(this.timeSecond(this.currentTime)),
      //   isNaN(parseFloat(this.lyricArray[this.nowIndex + 1].time))
      // );

      // 先判断是否有歌词
      if (this.lyricState) {
        // 一定要进行格式转换 因为对象中存储的是string 判断时 需要转成数字进行判断
        if (
          this.timeSecond(this.currentTime) >=
          parseFloat(this.lyricArray[this.nowIndex + 1].time)
        ) {
          this.nowIndex++;
        }
      }
    },
    // 子组件方法
    childByValue: function(childValue) {
      this.prgInWidth = childValue;
      document.getElementsByTagName("audio")[0].currentTime =
        childValue *
        Math.floor(document.getElementsByTagName("audio")[0].duration);
      // childValue就是子组件传过来的值
      // console.log(document.getElementsByTagName("audio")[0].currentTime);
      this.lyricArray.map((item, i) => {
        if (
          childValue *
            Math.floor(document.getElementsByTagName("audio")[0].duration) >=
            item.time &&
          childValue *
            Math.floor(document.getElementsByTagName("audio")[0].duration) <
            this.lyricArray[i + 1].time
        ) {
          this.nowIndex = i;
        }
      });
    }
  },
  watch: {
    prgInWidth: "lyricNow"
  },
  created() {
    var params = new URLSearchParams();
    params.append("id", this.$route.query.id);
    axios
      .post(ip + "/front/music", params)
      .then(
        response => (
          (this.$refs.audio.src =
            ip + "/api/music/" +
            response.data.reqData.data[0].url),
          (this.songSource =
            ip + "/api/music/" +
            response.data.reqData.data[0].url),
          (this.songImg =
            ip + "/api/img/" +
            response.data.reqData.data[0].img),
          (this.songTitle = response.data.reqData.data[0].name),
          (this.songAuthor = response.data.reqData.data[0].author_name),
          (this.duration = response.data.reqData.data[0].songTime),
          (document.title = this.songTitle + "-" + this.songAuthor)
        )
      );
    axios
      .post(ip + "/front/musicLyric", params)
      .then(response => {
        if (response.data.reqData.data.length > 0) {
          this.lyricState = true;
          return (
            (this.lyric = response.data.reqData.data[0].lyric_content),
            this.showLyric()
          );
        } else {
          this.lyricState = false;
          return false;
        }
      });
  },
  mounted() {
    if (this.lyricState) {
      this.lyricNow();
    }
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
.MusicPlayer {
  width: 100%;
  height: 350px;
  transition: all 1s ease;
}
.MusicPlay-bg {
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-origin: content-box;
  width: 1440px;
  height: 350px;
  z-index: -1;
  overflow: hidden;
  filter: blur(20px);
}
.MusicPlay-bg:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  /* left: 0;
  top: 0;
  background: inherit;
  filter: blur(20px);  */
  background-color: rgba(0, 0, 0, 0.35);
}
.MusicPlayer-info {
  width: 100%;
  min-height: 10px;
  overflow: hidden;
}
.MusicPlayer-img {
  float: left;
  width: 300px;
  height: 300px;
}
.MusicPlayer-img img {
  width: 200px;
  height: 200px;
  margin: 50px;
  /* border: 25px solid #ccc; */
  border-radius: 50%;
  transition: all 1s cubic-bezier(1, 1, 0, 0);
}
/* .musicOn {
  -webkit-animation: haha1 36s linear infinite;
}
@-webkit-keyframes haha1 {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
} */

.MusicPlayer-img-border {
  background-image: url("../../static/coverall.png");
  width: 236px;
  height: 217px;
  position: absolute;
  margin-top: -251px;
  margin-left: 45px;
  background-position: -144px -606px;
  background-size: 390px 1550px;
  background-repeat: no-repeat;
}
.MusicPlayer-lyric {
  float: left;
  width: 1100px;
  height: 300px;
}

.MusicPlayer-content {
  max-width: 1440px;
  height: 50px;
  margin: 0 auto;
}
.MusicPlayer-controller {
  float: left;
  position: relative;
  width: 120px;
  height: 100%;
}
.MusicPlayer-controllerBtn {
  cursor: pointer;
  float: left;
  margin-top: 13px;
  width: 36px;
  height: 50px;
  text-align: center;
  color: #fff;
}

.MusicPlayer-songInfo {
  float: left;
  width: 800px;
  height: 50px;
  margin-left: 15px;
}
.MusicPlayer-songName {
  float: left;
  margin-top: 5px;
  color: #fff;
  width: 100%;
}
.MusicPlayer-songTitle {
  float: left;
  margin-right: 20px;
}
.MusicPlayer-songAuthor {
  float: left;
}
.MusicPlayer-time {
  float: right;
}
.MusicPlayer-progress {
  float: left;
  width: 800px;
}
.MusicPlayer-rightControll {
  float: left;
  margin-left: 10px;
  height: 50px;
  width: 400px;
}
#audioPlayer {
  display: none;
}

/*
*  歌词
*/
.lyric-content {
  width: 100%;
  min-height: 10px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0, 0, 0, 0);
}
.nolyric-content {
  width: 100%;
  height: 300px;
  overflow: hidden;
  text-align: center;
  position: relative;
}
.no-lyric {
  position: absolute;
  color: #fff;
  top: 50%;
}
.lyric-content > li {
  color: #fff;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
.lyric_now {
  color: #00a1d6 !important;
  font-size: 20px;
  height: 50px !important;
  line-height: 50px !important;
}
</style>

