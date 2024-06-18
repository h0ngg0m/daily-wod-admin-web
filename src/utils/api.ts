import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { getAccessToken, isTokenExpired, refreshTokens } from '@/utils/token'
import type { CommonResponse } from '@/definitions/type'
import router from '@/router'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()

    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response) => {
    if (response.status === 404) {
      await router.push('/error/404')
    }
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      let accessToken = getAccessToken()

      if (!accessToken) {
        await router.push('/login')
        return
      }

      if (isTokenExpired(accessToken)) {
        await refreshTokens()
        accessToken = getAccessToken()
      }

      error.config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }

      return await axios.request(error.config)
    }
    return Promise.reject(error)
  }
)

export async function getApi<T>(url: string): Promise<AxiosResponse<CommonResponse<T>>> {
  return await instance.get<T, AxiosResponse<CommonResponse<T>>>(url)
}

export async function postApi<T>(url: string, data: T): Promise<AxiosResponse<CommonResponse<T>>> {
  return await instance.post<T, AxiosResponse<CommonResponse<T>>>(url, data)
}

export async function putApi<T>(url: string, data: T): Promise<AxiosResponse<CommonResponse<T>>> {
  return await instance.put<T, AxiosResponse<CommonResponse<T>>>(url, data)
}

export async function deleteApi<T>(url: string): Promise<AxiosResponse<T>> {
  return await instance.delete<T, AxiosResponse<T>>(url)
}
