import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { getCookieOnClient } from "@/helpers/clientCookies"
import { deleteCookie } from "./cookie"

export const apiManager = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiManager.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getCookieOnClient("accessToken")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

apiManager.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      console.log("Unauthorized. Redirecting to login page.", error.response)
      await deleteCookie()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)
