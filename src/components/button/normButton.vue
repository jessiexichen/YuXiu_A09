<template>
  <button
    style="margin: 2px;"
  >
    {{ props.font }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  font: {
    type: String,
    default: "按钮"
  }
})
</script>

<style lang="scss" scoped>
  button {
    background-color: #EFF8FF;
    color: black;
    padding: 5px 14px;
    border: none;
    border-radius: var(--el-border-radius-base);
    font-size: var(--el-font-size-base);
    box-sizing: border-box;
    cursor: pointer;
    border: white solid 1px;
  }
  .active {
      background-color: #D1E2FE;
      border: #1975FF solid 1px;
    }
  :hover {
      background-color: rgb(197.7, 225.9, 255);
      transition: all 0.3s;
  }
</style>
