import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import Home from '@/views/HomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import NewVoice from '@/views/NewVoice.vue'
import Text2Speech from '@/views/Text2Speech.vue'
import PPTCreation from '@/views/PPTCreation.vue'
import TranHistory from '@/views/TranHistory.vue'
import UserCenter from '@/views/UserCenter/UserCenter.vue'
import MyVoice from '@/views/UserCenter/childPages/MyVoice.vue'
import MyWords from '@/views/UserCenter/childPages/MyWords.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "登录",
      component: LoginPage,
    },
    {
      path: "/home",
      name: "首页",
      component: Home,
    },
    {
      path: "/register",
      name: "注册",
      component: RegisterPage
    },
    {
      path: "/user-center",
      name: "个人中心",
      component: UserCenter,
      children: [
        {
          path: "myvoice",
          name: "我的声音",
          component: MyVoice
        },
        {
          path: "mywords",
          name: "我的词库",
          component: MyWords
        }
      ]
    },
    {
      path: "/tranhistory",
      name: "转录历史",
      component: TranHistory,
    },
    {
      path: "/new-voice",
      name: "构建声音",
      component: NewVoice
    },
    {
      path: "/text-to-speech",
      name: "语音合成",
      component: Text2Speech
    },
    {
      path: "/ppt-creation",
      name: "有声课件制作",
      component: PPTCreation
    }
  ],
})

router.beforeEach(()=>{
})
export default router
