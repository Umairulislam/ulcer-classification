"use client"

import { useSelector } from "react-redux"

const page = () => {
  const user = useSelector((state) => state.user.user)
  console.log("🚀 ~ page ~ user:", user)
  return <h1>Doctors Dashboard</h1>
}

export default page
