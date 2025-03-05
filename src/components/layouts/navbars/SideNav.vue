<template>
  <div class="Container">
    <div class="nothing" />
    <div style="background-color: #eff8ff;">
      <div class="nothing2"/>
      <div class="SideNav">
        <div class="block" style="background: #F0F4FD;">产品服务</div>
        <div class="block"
          v-for="item in childPages"
          :key="item.name"
          @click="router.push(item.url)"
          :class="isActive(item.url)"
        >
        {{ item.name }}
      </div>
    </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';


function isActive(url: string) {
  if (useRoute().path === url) {
    return "active";
  }
  else return "";
}

</script>

<script lang="ts">
const childPages = [
  { name: "产品&服务", url: "/home" ,descrip: "系统语音教学 个性化语音服务"},
  { name: "语音合成", url: "/text-to-speech" },
  { name: "构筑声音", url: "/new-voice" },
  { name: "有声课件制作", url: "/ppt-creation" },
  { name: "个人中心", url: "/user-center" },
];
</script>

<style lang="scss">
.Container {
  display: flex;
  height: 100%;
  width: 250px;
  .nothing {
    width: 150px;
    background-color: #eff8ff;
  }
  .nothing2 {
      width: 100%;
      height: 70px;
      background-color: #eff8ff;
  }

  .SideNav {
    $blockHeight: 60px;
    background-color: rgb(255,255, 255);
    width: 150px;
    height: 500px;
    .block {

      cursor: pointer;
      border-bottom: 1.4px solid #f3f4f6;
      font-weight: bold;

      text-align: center;
      width: 100%;
      height: $blockHeight;
      line-height: $blockHeight;
    }
    .active {
        color: #1975ff;
        // box-shadow: 2px 2px 5px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.8);
    }

  }
}

</style>
