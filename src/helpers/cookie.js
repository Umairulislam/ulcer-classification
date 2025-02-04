"use server";

import { cookies } from "next/headers"

const createCookie = async (value) => {
    cookies().set({
        name: "accessToken",
        value: value,
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    })
}

const deleteCookie = async () => {
    cookies().delete("accessToken")
}

export { createCookie, deleteCookie }