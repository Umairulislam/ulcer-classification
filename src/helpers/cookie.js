"use server"

import { cookies } from "next/headers"

// Create a cookie (Used during Login)
export const createCookie = async (value) => {
  const cookiesStore = await cookies()
  cookiesStore.set({
    name: "accessToken",
    value: value,
    httpOnly: false,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}

// Delete a cookie (Used during Logout)
export const deleteCookie = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
}
