import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken")
    }

    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default AxiosInstance
