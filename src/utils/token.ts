import axios from 'axios'
import router from '@/router'

export function removeTokens(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken')
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) {
    return true
  }
  try {
    const decodedPayload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return decodedPayload.exp <= currentTime
  } catch (e) {
    console.error('Error checking token expiration', e)
    return true
  }
}

export async function refreshTokens(): Promise<void> {
  const refreshToken = getRefreshToken()

  if (!refreshToken || isTokenExpired(refreshToken)) {
    await router.push('/login')
  }

  const response = await axios.post(`${import.meta.env.VITE_API_URL}refresh`, {
    refreshToken: refreshToken
  })

  // TODO: saveTokens(response.data.data)
}

export async function logout(): Promise<void> {
  removeTokens()
  await router.push('/login')
}
