import { Metadata } from "next"
import LoginForm from "./LoginForm"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Login",
}

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
