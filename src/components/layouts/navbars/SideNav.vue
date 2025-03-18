<template>
  <div class="Container">
    <div class="SideNav">
      <div class="block" style="background: #F0F4FD;cursor: default;font-size: large;">产品&服务</div>
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
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import { childPages } from '@/assets/constants';

function isActive(url: string) {
  if (useRoute().path.includes(url)){
    return "active";
  } else return "";
}

</script>

<script lang="ts">

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
      transition: all 0.2s;
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

    }
    .active {
        color: #1975ff;
        // box-shadow: 2px 2px 5px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.8);
    }

  }
}

</style>
