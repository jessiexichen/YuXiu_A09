<template>
  <el-container
    style="height: 100vh;"

  >
    <el-header v-if="props.topNav" style="padding: 0;width: 100%;height: 70px;">
      <TopNav/>
    </el-header>
    <el-container
      style="overflow: auto;background-size: cover;"
      :style="{backgroundImage: `url(${backgroundImg})`}"
    >
      <el-side v-if="props.sideNav">
        <SideNav />
      </el-side>
      <el-scrollbar style="width: 100%;min-height: 100%;">
        <el-main style="display: flex;height: 100%;width: 100%;" class="main">
            <slot />
        </el-main>
      </el-scrollbar>
    </el-container>

  </el-container>
</template>
<script setup lang="ts">
import { ElContainer } from 'element-plus';
import TopNav from './navbars/TopNav.vue';
import SideNav from './navbars/SideNav.vue';
import normBackground from '@/assets/普通页面.png';
import LoginBackground from '@/assets/登录注册页面.png';
import HomeBackground from '@/assets/home上部.png';
import { computed } from 'vue';

const props = defineProps({
  topNav: {
    type: Boolean,
    default: true
  },
  sideNav: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    defualt: undefined
  }
})

const backgroundImg = computed(() => {
  if(props.background === "Login") return LoginBackground;
  else if(props.background === "Home") return HomeBackground;
  else return normBackground
})
</script>

<style lang="scss">
.el-scrollbar__view {
  height: 100%;
  width: 100%;
}
</style>
