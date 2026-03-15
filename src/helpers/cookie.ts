"use server"

import { cookies } from "next/headers"

export const createCookie = async (value: string): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set({
    name: "accessToken",
    value,
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}

export const deleteCookie = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
}
