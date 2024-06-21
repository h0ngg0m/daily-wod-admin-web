import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { isTokenExpired, refreshTokens } from '@/utils/token'
import type { ApiResult } from '@/definitions/type'
import router from '@/router'
import { useAdminStore } from '@/stores/admin'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true
})

instance.interceptors.request.use(
  (config) => {
    const { getAccessToken } = useAdminStore()
    const accessToken = getAccessToken()
    config.headers['Authorization'] = accessToken
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

// instance.interceptors.response.use(
//   async (response) => {
//     // if (response.status === 404) {
//     //   await router.push('/error/404')
//     // }
//     return response
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       let accessToken = getAccessToken()
//
//       if (!accessToken) {
//         await router.push('/login')
//         return
//       }
//
//       if (isTokenExpired(accessToken)) {
//         await refreshTokens()
//         accessToken = getAccessToken()
//       }
//
//       error.config.headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       }
//
//       return await axios.request(error.config)
//     }
//     return Promise.reject(error)
//   }
// )

export async function getApi<R>(url: string): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.get<R, AxiosResponse<ApiResult<R>>, any>(url)
}

export async function postApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.post<R, AxiosResponse<ApiResult<R>>, D>(url, data)
}

export async function putApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.put<R, AxiosResponse<ApiResult<R>>, D>(url, data)
}

export async function deleteApi<R>(url: string): Promise<AxiosResponse<R>> {
  return await instance.delete<R, AxiosResponse<R>, any>(url)
}
