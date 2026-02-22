import axios from "axios"
import { getCookieOnClient } from "@/helpers/clientCookies"

export const apiManager = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request Interceptor: Adds the token to headers
apiManager.interceptors.request.use((config) => {
  // Guard: only run on client
  if (typeof window !== "undefined") {
    const token = getCookieOnClient("accessToken")
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, Promise.reject)

// Response Interceptor: Handles expired sessions
apiManager.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Clear cookie and force redirect if token is invalid
      document.cookie = "accessToken=; Max-Age=0; path=/;"
      window.location.href = "/login"
    }

    console.log("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)
