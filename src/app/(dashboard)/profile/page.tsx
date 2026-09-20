import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import ProfileForm from "./ProfileForm"

export const metadata: Metadata = {
  title: "My Profile",
}

const ProfilePage = () => {
  return (
    <>
      <PageHeader title="My Profile" subtitle="Manage your personal information" />
      <ProfileForm />
    </>
  )
}

export default ProfilePage
