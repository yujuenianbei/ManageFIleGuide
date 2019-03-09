<template>
  <button class="button-ele">button</button>
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
.button-ele {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 7px 10px;
  font-size: 14px;
  border-radius: 4px;
}
.button-ele:focus {
  outline: none;
  border-color: #409eff;
}
</style>
