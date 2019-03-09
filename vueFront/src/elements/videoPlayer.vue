<template>
  <div class="video">
    <div class="Video">
      <div class="Video_title">
        <h2 class="Video-name">{{videoTitle}}</h2>
        <span class="Video-author">{{videoAuthor}}</span>
      </div>
      <div id="VideoPlay" class="VideoPlay" :class="{'VideoPlay-player-fullScreen': fullScreen}">
        <div class="VideoPlay-player" @mousemove="mosemoveing()">
          <video
            ref="video"
            id="videoPlayer"
            width="100%"
            height="100%"
            :poster="videoPoster"
            :controls="false"
            :loop="videLoop"
            @click="playToggle()"
          >
            <source :src="videoUrl" type="video/mp4">
          </video>
        </div>
        <div
          class="VideoPlay-controll"
          :class="{'VideoPlay-controll-on': controllState}"
          @mousemove="PlayControllOn()"
        >
          <div class="VideoPlay-controller" @click="playToggle()">
            <i class="fa fa-icons" :class="{'fa-play': !videoState, 'fa-pause': videoState}"></i>
          </div>
          <div class="VideoPlay-progress">
            <ProgressS
              v-on:childByValue="childByValue"
              :height_out_y="prgheight"
              :backgroundcolor_out_y="prgbgColor"
              :width_on_y="prgInWidth"
              :buffered_width="bufferWidth"
            />
          </div>
          <div class="VideoPlay-time">
            <span class="VideoPlay-times">{{currentTime}}</span>
            <span class="VideoPlay-times">/</span>
            <span class="VideoPlay-times">{{duration}}</span>
          </div>
          <div class="VideoPlay-controller fr">
            <i class="fa fa-icons fa-expand" @click="FullScreen()"></i>
          </div>
          <div class="VideoPlay-controller fr" @click="repeatToggle()">
            <i
              class="fa fa-icons fa-repeat"
              :class="{videoRepeat: videLoop,videoNoRepeat: !videLoop}"
            ></i>
          </div>
          <div class="VideoPlay-controller fr">
            <i class="fa fa-icons fa-volume-up"></i>
          </div>
        </div>
        <div class="videoState" :class="{videoOn: videoState, videoOff: !videoState}">
          <img src="../../static/img_loading.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressS from "./progress.vue";
import { setTimeout } from "timers";
import axios from "axios";
export default {
  components: { ProgressS },
  data: function() {
    return {
      fullScreen: false,
      videoState: false,
      videLoop: false,
      videoUrl: "",
      videoPoster: "",
      videoTitle: "",
      videoAuthor: "",
      videoDate: "",
      prgbgColor: "#f5f5f5",
      prgheight: "6px",
      prgInWidth: 0,
      bufferWidth: 0,
      duration: "00:00",
      currentTime: "00:00",
      mosemove: false,
      controllState: true
    };
  },
  methods: {
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
    // 收起/显示播放控制台
    mosemoveing() {
      clearTimeout(this.timer1);
      if (!this.videoState) {
        this.controllState = true;
      } else {
        this.mosemove = true;
        this.controllState = true;
        this.timer1 = setTimeout(() => {
          this.mosemove = false;
          this.controllState = false;
        }, 2000);
      }
    },
    PlayControllOn() {
      this.controllState = true;
    },
    // 播放/暂停
    playToggle() {
      console.log(this.videoUrl);
      console.log(this.videoPoster);
      const video = document.getElementById("videoPlayer");
      let duration = Math.floor(video.duration); //总时长
      let currentTime = Math.floor(video.currentTime); //当前时间
      if (this.videoState) {
        video.pause();
        clearInterval(this.timer);
        clearTimeout(this.timer1);
      } else {
        video.play();
        this.timer = setInterval(() => {
          currentTime = Math.floor(video.currentTime);
          this.prgInWidth = (currentTime / duration) * 100 + "%";
          this.currentTime = this.secondToDate(currentTime);
          this.duration = this.secondToDate(duration);
          this.bufferWidth = (video.buffered.end(0) / duration) * 100 + "%";
        }, 100);
      }
      this.videoState = !this.videoState;
    },
    // 循环
    repeatToggle() {
      this.videLoop = !this.videLoop;
    },
    FullScreen() {
      var ele = document.getElementById("VideoPlay");
      // 全屏
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
      }
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      // 修改全屏状态
      if (this.fullScreen) {
        this.fullScreen = false;
      } else {
        this.fullScreen = true;
      }
    },
    // 子组件方法（进度条拖拽）
    childByValue: function(childValue) {
      const video = document.getElementById("videoPlayer");
      this.prgInWidth = childValue;
      video.currentTime = childValue * Math.floor(video.duration);
      // childValue就是子组件传过来的值
    },
    addEventListeners() {
      document.getElementById("VideoPlay").resize(function() {
        if (this.fullScreen) {
          console.log("退出全屏");
        }
      });
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append("id", this.$route.query.id);
    axios
      .post("http://localhost:3000/front/video", params)
      .then(
        response => (
          (this.$refs.video.src =
            "http://localhost:3000/api/video/" +
            response.data.reqData.data[0].url),
          (this.videoUrl =
            "http://localhost:3000/api/video/" +
            response.data.reqData.data[0].url),
          (this.videoPoster =
            "http://localhost:3000/api/img/" +
            response.data.reqData.data[0].img),
          (this.videoTitle = response.data.reqData.data[0].album_name),
          (this.videoAuthor = response.data.reqData.data[0].author_name),
          (this.videoDate = response.data.reqData.data[0].album_date),
          document.title = response.data.reqData.data[0].album_name + '-' + response.data.reqData.data[0].author_name
        )
      );
  },
  mounted() {
    // this.addEventListeners();
    console.log(document.title)
  }
};
</script>

<style>
.Video {
  float: left;
  width: 1067px;
}
.Video-name {
  float: left;
  max-width: 100%;
  margin-top: -10px;
  margin-right: 8px;
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
}
.Video-author {
  color: #0c73c2;
}
.VideoPlay {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  margin-top: 15px;
}
.VideoPlay-player {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 1.42857;
  color: #fff;
  overflow: hidden;
}
.VideoPlay-player-fullScreen {
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999 !important;
}

#videoPlayer {
  background-color: #000;
}
.VideoPlay-controll {
  width: 100%;
  height: 40px;
  background-color: #ffffff7d;
  position: absolute;
  bottom: -40px;
  transition: all 1s ease;
}
.VideoPlay-controll-on {
  bottom: 0px !important;
}
.VideoPlay-controller {
  float: left;
  cursor: pointer;
  padding-top: 8px;
  width: 40px;
  height: 32px;
  text-align: center;
}
.VideoPlay-controller:hover {
  background-color: #ffffff5c;
}
.VideoPlay-progress {
  float: left;
  width: calc(100% - 270px);
  padding: 7px 10px 0px;
  height: 33px;
}
.VideoPlay-time {
  float: left;
  height: 30px;
  padding: 10px 0px 0px;
}
.VideoPlay-times {
  color: #fff;
  font-size: 14px;
}
.videoRepeat {
  color: #333;
}
.videoNoRepeat {
  color: #ccc;
}
.videoState {
  position: absolute;
  bottom: 60px;
  width: 50px;
  right: 40px;
}
.videoOn {
  display: none;
}
.videoOff {
  display: block;
}
</style>
