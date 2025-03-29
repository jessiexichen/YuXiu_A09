<template>
  <div class="loginButton" @click="handleTab()" v-if="!useLoginStore().loginStatus">
    登录
  </div>
  <div v-else>
    <el-avatar :src="useAvatarStore().avatarUrl" class="avatar" @click="handleTab()" />
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useLoginStore } from '@/stores/login';
import { useAvatarStore } from '@/stores/avatar';
import { ElAvatar } from 'element-plus';

function handleTab() {
  if(!useLoginStore().loginStatus) {
    router.push("login")
  }
  else {
    router.push("/user-center")
  }
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

.avatar {
  position: relative;
  top: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
}
</style>
