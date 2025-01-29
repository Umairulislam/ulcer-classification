"use client"

const { AxiosInstance, Toast, Loader } = require("@/components")
const { setUser } = require("@/store/userSlice")
const { useRouter } = require("next/navigation")
const { useState, useEffect } = require("react")
const { useDispatch } = require("react-redux")

const AppProvider = ({ children }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const getUserData = async () => {
        setLoading(true)
        try {
            const accessToken = localStorage.getItem("accessToken")
            if (!accessToken) {
                router.push("/login")
                return
            }
            const { data } = await AxiosInstance.get("auth/get/me")
            console.log("🚀 ~ getUserData ~ data:", data)
            dispatch(setUser(data?.response?.details))
        } catch (error) {
            localStorage.removeItem("accessToken");
            console.log("🚀 ~ getUserData ~ error:", error)
            router.push("/login");
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