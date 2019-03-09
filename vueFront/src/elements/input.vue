<template>
  <input class="input-ele" type="text">
</template>
<script>
export default {
  data: function() {
    return {};
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
    }
  }
};
</script>

<style>
.input-ele {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 21px;
  outline: none;
  padding: 0 5px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  /* width: 100%; */
  float: left;
}
.input-ele:focus {
  outline: none;
  border-color: #409eff;
}
</style>
