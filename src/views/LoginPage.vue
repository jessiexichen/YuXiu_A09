<template>
  <LayOut :side-nav="false">
    <div style="margin-top: 7%;" class="card">
      <div class="card-block titleBlock">
        <div
          class="title" @click="changeLogType('email')"
          :class="loginType === 'email' ? 'active': undefined"
        >
          邮箱登录
        </div>
        <div
          class="title" @click="changeLogType('account')"
          :class="loginType === 'account' ? 'active' : undefined"
        >
          账号密码登录
        </div>
      </div>
      <div class="card-block logo">
        <img src="@/assets/logo3.png" style="width: 150px;"/>
      </div>
      <div
        v-if="loginType === 'email'"
        class="card-block input"
      >
        <ElInput size="large" placeholder="请输入邮箱地址" v-model="email" />
        <ElInput size="large" type="password" placeholder="请输入密码" v-model="password" :show-password="true" />
      </div>
      <div
        v-else
        class="card-block input"
      >
        <ElInput size="large" placeholder="请输入账号" v-model="account" />
        <ElInput size="large" type="password" placeholder="请输入密码" v-model="password" :show-password="true" />
      </div>
      <div class="card-block initial">
        <ElCheckbox  v-model="initial" class="checkbox" />
        <div>
          我已阅读并同意
          <a>服务协议</a>
          、<a>隐私协议</a>和
          <a>版权协议</a>
        </div>
      </div>
      <div class="card-block function">
        <ElButton type="primary" size="large" style="width: 100%; height: 45px;">登录</ElButton>
        <RouterLink to="/register">去注册-></RouterLink>
      </div>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import { ElButton, ElInput, ElCheckbox } from 'element-plus';
import { ref } from 'vue';

const loginType = ref("email")
function changeLogType(type: "email" | "account") {
  loginType.value = type
}
const password = ref(undefined)
const email = ref(undefined)
const account = ref(undefined)
const initial = ref(undefined)
</script>

<style scoped lang="scss">
.card {
  position: relative;
  left: 20%;
  top: 15%;
  width: 500px;
  height: 580px;


  @media screen and (max-width: 800px){
    left: 100px;
  }
  @media screen and (max-height: 750px) {
    top: 15px;
  }
  @media screen and (max-width:700px) {
    left: 40px;
  }
  a {
      color: #3f84f6;
      text-decoration: none;
  }

  .titleBlock {
    position: relative;
    width: 80%;
    border-bottom: 2px solid #f6f7f8;
    padding-bottom: 0px;
    height: 60px;

    .title {
      cursor: pointer;
      font-weight: 500;
    }
    .active {
      color:#457af7;
      border-bottom: 2px solid #457af7;
    }
  }
  .logo {
    display: flex;
    width: 80%;
    padding-top: 30px;
    justify-content: center;
    background-color: #eff8ff;
    margin-top: 30px;
  }

  .input {
    width: 85%;
    flex-direction: column;
    padding-top: 40px;
  }

  .initial {
    width: 80%;
    height: 20px;
    padding-left: 0;
    padding-right: 0;
    gap: 5px;
    .checkbox {
      height: 16px;
      width: 16px;
    }

    line-height: 15px;
  }

  .function {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 85%;
    margin-top: 10px;
  }
}


</style>
