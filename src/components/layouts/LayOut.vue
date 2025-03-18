<template>
  <el-container style="height: 100vh;">
    <el-header v-if="props.topNav" style="padding: 0;width: 100%;height: 70px;">
      <TopNav/>
    </el-header>
    <el-container style="background-color: #eff8ff;overflow: auto;">
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

const props = defineProps({
  topNav: {
    type: Boolean,
    default: true
  },
  sideNav: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
.el-scrollbar__view {
  height: 100%;
  width: 100%;
}
</style>
