import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import ChangePasswordForm from "./ChangePasswordForm"

export const metadata: Metadata = {
  title: "Change Password",
}

const ChangePasswordPage = () => {
  return (
    <>
      <PageHeader title="Change Password" subtitle="Update your account password" />
      <ChangePasswordForm />
    </>
  )
}

export default ChangePasswordPage
