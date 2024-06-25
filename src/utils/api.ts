import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { isTokenExpired } from '@/utils/token'
import type { ApiResult } from '@/definitions/type'
import { useAdminStore } from '@/stores/admin'
import router from '@/router'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true
})

instance.interceptors.request.use(
  async (config) => {
    const { getAccessToken } = useAdminStore()
    const accessToken = getAccessToken()
    if (isTokenExpired(accessToken)) {
      await router.push('/auth/login')
    }
    config.headers['Authorization'] = accessToken
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return error.response
  }
)

export async function getApi<R>(url: string): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.get<R, AxiosResponse<ApiResult<R>>, any>(url)
}

export async function postApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.post<R, AxiosResponse<ApiResult<R>>, D>(url, data)
}

export async function putApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.put<R, AxiosResponse<ApiResult<R>>, D>(url, data)
}

export async function deleteApi<R>(url: string): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.delete<R, AxiosResponse<ApiResult<R>>, any>(url)
}
