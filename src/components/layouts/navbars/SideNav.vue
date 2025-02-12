<template>
  <div class="SideNav">
    <div class="block"
      v-for="item in childPages"
      :key="item.name"
      @click="router.push(item.url)"
      :class="isActive(item.url)"
    >
    {{ item.name }}
  </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';

</script>

<script lang="ts">
const childPages = [
  { name: "产品&服务", url: "/home/product" },
  { name: "语音合成", url: "/home/synthesize" },
  { name: "个性化语音", url: "/home/specialize" },
  { name: "构筑声音", url: "/home/build" },
  { name: "有声课件制作", url: "/home/ppt" },
  { name: "个人中心", url: "/home/profile" },
];

function isActive(url: string) {
  if (useRoute().path === url) {
    return "active";
  }
  return "";
}
</script>

<style lang="scss">
.SideNav {
  $blockHeight: 70px;
  background-color: rgb(255,255, 255);
  width: 200px;

  .block {
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    font-weight: bold;

    text-align: center;
    width: 100%;
    height: $blockHeight;
    line-height: $blockHeight;

    .active {
      background-color: #f0f4fd;
    }
  }

}
</style>
