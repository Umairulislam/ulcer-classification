import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import PatientForm from "../../PatientForm"

export const metadata: Metadata = {
  title: "Edit Patient",
}

interface EditPatientPageProps {
  // Next.js 15/16 — route params are async, must be awaited before use.
  params: Promise<{ id: string }>
}

const EditPatientPage = async ({ params }: EditPatientPageProps) => {
  const { id } = await params

  return (
    <>
      <PageHeader title="Edit Patient" subtitle="Update patient details" />
      <PatientForm mode="edit" patientId={id} />
    </>
  )
}

export default EditPatientPage
