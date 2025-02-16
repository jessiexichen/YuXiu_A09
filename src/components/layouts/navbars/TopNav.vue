<template>
  <div class="TopNav">
    <div class="logoBlock">
        <img
          class="logo"
          src="@/assets/logo2.png"
        >
        <div class="logo-title">
          <text>毓秀语音</text>
          <text>教学平台</text>
        </div>
    </div>
    <div class="navBlock">
      <div
       class="blocks"
       v-for="item in navPages"
       :key="item.name"
       @click="handleNav(item.url)"
      >
      {{item.name}}
      </div>
    </div>
    <div style="display:flex; align-items: center;position: absolute;right: 2%;top: 30%;">
      <LoginButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import type { navPage } from '@/types/navBar';
import LoginButton from './features/LoginButton.vue';

function handleNav(url: string) {
  router.push(url)
}
</script>

<script lang="ts">
  export const navPages : navPage[] = [
    {name: "首页",url: "/home"},{name:"产品简介",url: "/home/profile"},
    {name:"使用教程",url: "/home/tutor"},{name: "功能介绍",url: "/home/introduce"}
  ]
</script>

<style lang="scss">
.TopNav {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #eff8ff;
  gap: 80px;
  border: 1px solid #d1d9e0;
  border-radius: 9px;

  .logoBlock {
    display: block;
    position: relative;
    left: 5%;

    font-size: 0.9rem;
    .logo {
      position: relative;
      height: 50px;
    }
    .logo-title {
        width: 100%;
        bottom: 3%;
        text-align: center;
        position: absolute;
    }
  }

  .navBlock {
    width: 1000px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .blocks {
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
