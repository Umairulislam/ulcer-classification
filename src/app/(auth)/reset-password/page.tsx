import { Suspense } from "react"
import type { Metadata } from "next"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password",
}

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPasswordPage
