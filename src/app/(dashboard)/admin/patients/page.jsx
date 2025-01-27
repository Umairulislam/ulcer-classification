"use client"
import { useSelector } from "react-redux"

const page = () => {
  const { user } = useSelector((state) => state.user)
  console.log("🚀 ~ page ~ user:", user)
  return <h1>Patients Dashboard</h1>
}

export default page
