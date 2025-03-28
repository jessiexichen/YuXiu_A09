import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAvatarStore = defineStore('avatar', () => {
  const avatarUrl = ref("/avatar.png");
  function changeAvatar(url: string) {
    avatarUrl.value = url;
  }

  return { avatarUrl, changeAvatar }
})
