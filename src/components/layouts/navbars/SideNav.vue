<template>
  <div class="Container">
    <div class="SideNav">
      <div class="block" style="background: #F0F4FD;cursor: default;">产品服务</div>
      <div class="block"
        v-for="item in childPages"
        :key="item.name"
        @click="router.push(item.url)"
        :class="isActive(item.url)"
      >
      {{ item.name }}
    </div>
    <div class="block">
      个人中心
      <div class="options">
        <div class="option" @click="router.push('/user-center/myvoice')">我的声音</div>
        <div class="option" @click="router.push('/user-center/tranhistory')">生成历史</div>
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
];
</script>

<style lang="scss">
.Container {
  display: flex;
  height: calc(100% - 80px);
  width: 260px;
  margin-top: 80px;
  .SideNav {
    $blockHeight: 60px;
    position: absolute;
    left: 5%;
    background-color: rgb(255,255, 255);
    width: 150px;
    height: 500px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;

    .block {
      cursor: pointer;
      border-bottom: 1.4px solid #f3f4f6;
      font-weight: bold;

      text-align: center;
      width: 100%;
      height: $blockHeight;
      line-height: $blockHeight;

      &:hover {

        background-color: #f3f4f6;

        .options {
          visibility: visible;
          opacity: 1;

        }
      }
      .options {
        visibility: hidden;
        opacity: 0;
        width: 120px;
        border: 1px solid #d1d9e0;
        position: relative;
        left: 150px;
        bottom: 60px;
        z-index: 1;
        .option {
          height: 50px;
          display: block;
          background-color: #ffffff;
          border-bottom: 1px solid #d1d9e0;
          line-height: 50px;

          &:hover {
            background-color: #f3f4f6;
            color: #1975ff;
          }
        }
      }

    }
    .active {
        color: #1975ff;
        // box-shadow: 2px 2px 5px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.8);
    }

  }
}

</style>
