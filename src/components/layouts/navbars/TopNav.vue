<template>
  <div class="TopNav">
    <div class="logoBlock">
        <img
          class="logo"
          src="@/assets/logo3.png"
        >
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
    <div class="logButton">
      <LoginButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { navPages } from '@/assets/constants';
import LoginButton from './features/LoginButton.vue';

function handleNav(url: string) {
  router.push(url)
}
</script>

<script lang="ts">

</script>

<style lang="scss">
.TopNav {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: #eff8ff;
  gap: 80px;
  border: 1px solid #d1d9e0;
  border-radius: 9px;

  .logoBlock {
    flex-grow: 0.6;
    display: block;
    position: relative;
    left: 5%;

    font-size: 0.9rem;
    .logo {
      position: relative;
      width: 150px;
    }
    .logo-title {
        width: 100%;
        bottom: 3%;
        text-align: center;
        position: absolute;
    }
  }

  .navBlock {
    flex-grow: 6;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    :hover {
      font-size: larger;
      color: #1975FF;
      background-color: #eff8ffef;
    }
    .blocks {
      font-weight: bold;
      cursor: pointer;

      transition: all 0.2s;

    }

    @media screen and (max-width: 1000px){
      overflow: hidden;


      justify-content: start;
      .blocks {
        width: 100px;
      }
    }
  }

  .logButton {
    display:flex;
    flex-grow: 1;
    align-items: center;
  }
}
</style>
