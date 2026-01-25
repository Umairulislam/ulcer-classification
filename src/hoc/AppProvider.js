"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { apiManager } from "@/helpers/apiManager"
import { setUser, clearUser } from "@/store/userSlice"
import { getCookieOnClient } from "@/helpers/clientCookis"
import { deleteCookie } from "@/helpers/cookie"
import { Loader, Toast } from "@/components"

// const { Toast, Loader } = require("@/components")
// const { setUser } = require("@/store/userSlice")
// const { useRouter } = require("next/navigation")
// const { useState, useEffect } = require("react")
// const { useDispatch } = require("react-redux")

const AppProvider = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const getUserData = async () => {
    setLoading(true)
    const token = getCookieOnClient("accessToken")
    if (!token) {
      setLoading(false)
      return
    }

    if (user) {
      setLoading(false)
      return
    }
    try {
      const { data } = await apiManager.get("auth/get/me")
      console.log("🚀 ~ getUserData ~ data:", data)
      dispatch(setUser(data?.response?.details))
    } catch (error) {
      console.log("🚀 ~ getUserData ~ error:", error)
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
