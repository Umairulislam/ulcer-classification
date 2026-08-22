import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import DoctorForm from "../DoctorForm"

export const metadata: Metadata = {
  title: "Add Doctor",
}

const CreateDoctorPage = () => {
  return (
    <>
      <PageHeader title="Add Doctor" subtitle="Create a new doctor account" />
      <DoctorForm mode="create" />
    </>
  )
}

export default CreateDoctorPage
