<template>
  <button
    style="margin: 2px;border: 1px solid black;"
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
    padding: 6px 15px;
    border-radius: var(--el-border-radius-base);
    font-size: var(--el-font-size-base);
    cursor: pointer;
  }
  :hover {
      background-color: rgb(197.7, 225.9, 255);
      transition: all 0.3s;
  }
</style>
