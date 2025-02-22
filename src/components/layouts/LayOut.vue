<template>
  <el-container style="height: 100vh;">
    <el-header v-if="props.topNav" style="padding: 0;width: 100%;height: 70px;">
      <TopNav/>
    </el-header>
    <el-container>
      <el-side v-if="props.sideNav" style="background-color: #fefefe;border: 1px solid #d1d9e0;">
        <SideNav />
      </el-side>
      <el-main style="background-color: #eff8ff;display: flex;" class="main">
        <slot />
      </el-main>
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

</style>
