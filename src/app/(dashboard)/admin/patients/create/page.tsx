import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import PatientForm from "../PatientForm"

export const metadata: Metadata = {
  title: "Add Patient",
}

const CreatePatientPage = () => {
  return (
    <>
      <PageHeader title="Add Patient" subtitle="Create a new patient record" />
      <PatientForm mode="create" />
    </>
  )
}

export default CreatePatientPage
