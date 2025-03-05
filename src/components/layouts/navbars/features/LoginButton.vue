<template>
  <div class="loginButton" @click="handleTab()">
    登录
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

function handleTab() {
  router.push("/login")
}
</script>
<style lang="scss">
.loginButton {
$buttonHeight: 40px;

  border: 1px solid #1975FF;
  border-radius: 21px;
  width: 80px;
  height: $buttonHeight;

  color:#1975FF;
  font-weight: bold;
  text-align: center;
  line-height: $buttonHeight;

  cursor: pointer;

  &:hover {
    background-color: rgb(30, 108, 253);
    color: rgb(255, 255, 255);
    transition: all 0.2s;
  }
}
</style>
