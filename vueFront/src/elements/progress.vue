<template>
  <div class="progress" :style="{ height: height_out_y ,backgroundColor: backgroundcolor_out_y}">
    <div class="progress_on" :style="{ width: this.width_on_y }"></div>
    <div class="progress_on_btn" :style="{ left: this.width_on_y }" @mousedown="move"></div>
    <div class="progress_then" :style="{ width: this.buffered_width }"></div>
  </div>
</template>
<script>
export default {
  props: ["height_out_y", "backgroundcolor_out_y", "width_on_y", "buffered_width"],
  data: function() {
    return {
      width: this.width_on_y
    };
  },
  methods: {
    addActive($event) {
      $event.currentTarget.className = "userTopActive toplist userTopList";
    },
    removeActive($event) {
      $event.currentTarget.className = " toplist userTopList";
    },
    showCombActive($event) {
      $event.currentTarget.className = "combTopActive toplist combTopList";
    },
    removeCombActive($event) {
      $event.currentTarget.className = "toplist combTopList";
    },
    move(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      // 获取外层宽度
      let odivWidth = document.getElementsByClassName("progress")[0]
        .clientWidth;
      let idivWidth = document.getElementsByClassName("progress_on")[0]
        .clientWidth;

      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        if (left / odivWidth < 0) {
          left = 0;
        } else if (left / odivWidth > 1) {
          left = odivWidth;
        }
        //移动当前元素
        odiv.style.left = left + "px";
        document.getElementsByClassName("progress_on")[0].style.width = left + "px";
        this.$emit("childByValue", left / odivWidth);
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
  mounted() {
    console.log(this.width_on_y);
  },
  updated() {
    // console.log(this.width_on_y);
  }
};
</script>

<style>
.progress {
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 6px;
  background-color: #f5f5f5;
}
.progress:hover .progress_on_btn{
  display: block;
}
.progress_on {
  float: left;
  position: relative;
  z-index: 4;
  width: 0px;
  height: 100%;
  background-color: #00a1d6;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  /* transition: width 0.6s ease; */
}
.progress_on_btn {
  display: block;
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-left: -7px;
  margin-top: -5px;
  left: 0px;
  z-index: 10;
  transition: width 0.6s ease;
  transition: box-shadow .3s,-webkit-box-shadow .3s;
}
.progress_on_btn:hover{
  box-shadow: 0 0 5px #017cc3;
}
.progress_then {
  position: relative;
  z-index: 3;
  height: 100%;
  background-color: #8adced;
}
</style>
