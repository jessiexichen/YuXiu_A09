import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const username = ref("");
  const password = ref("");
  const rememberPassword = ref(false);
  const loginStatus = ref(false);

  function login() {
    loginStatus.value = true;
  }

  return { username, password, rememberPassword, loginStatus, login }
})
