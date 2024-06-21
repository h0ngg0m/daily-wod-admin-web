import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { isTokenExpired } from '@/utils/token'
import router from '@/router'

export const useAdminStore = defineStore(
  'admin',
  () => {
    const accessToken = ref<string | null>(null)

    const loginFlag = computed<boolean>(() => {
      return !isTokenExpired(accessToken.value)
    })

    function saveAccessToken(token: string): void {
      accessToken.value = token
    }

    function getAccessToken(): string | null {
      return accessToken.value
    }

    async function logout(): Promise<void> {
      accessToken.value = null
      await router.push('/auth/login')
    }

    return { accessToken, loginFlag, saveAccessToken, getAccessToken, logout }
  },
  { persist: true }
)
