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
  { name: "产品&服务", url: "/home" ,descrip: "系统语音教学 个性化语音服务"},
  { name: "语音合成", url: "/text-to-speech" },
  { name: "构筑声音", url: "/new-voice" },
  { name: "有声课件制作", url: "/ppt-creation" },
  { name: "个人中心", url: "/user-center" },
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
  width: 150px;

  .block {
    cursor: pointer;
    border-bottom: 1.4px solid #f3f4f6;
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
