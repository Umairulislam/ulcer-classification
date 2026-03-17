"use client"

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apiManager } from "@/helpers/apiManager"
import { setUser, clearUser } from "@/store/userSlice"
import { getCookieOnClient } from "@/helpers/clientCookies"
import { deleteCookie } from "@/helpers/cookie"
import { Loader, Toast } from "@/components"
import { RootState, AppDispatch } from "@/store/store"
import { ApiResponse, UserRecord } from "@/types/api"

interface AppProviderProps {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(false)

  const getUserData = async (): Promise<void> => {
    const token = getCookieOnClient("accessToken")
    if (!token || user) return

    setLoading(true)
    try {
      const { data } = await apiManager.get<ApiResponse<UserRecord>>("auth/get/me")
      dispatch(setUser(data?.response?.details))
    } catch {
      await deleteCookie()
      dispatch(clearUser())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {loading ? <Loader /> : children}
      <Toast />
    </>
  )
}

export default AppProvider
