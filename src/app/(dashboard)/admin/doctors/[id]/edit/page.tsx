import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import DoctorForm from "../../DoctorForm"

export const metadata: Metadata = {
  title: "Edit Doctor",
}

interface EditDoctorPageProps {
  // Next.js 15/16 — route params are async, must be awaited before use.
  params: Promise<{ id: string }>
}

const EditDoctorPage = async ({ params }: EditDoctorPageProps) => {
  const { id } = await params

  return (
    <>
      <PageHeader title="Edit Doctor" subtitle="Update doctor details" />
      <DoctorForm mode="edit" doctorId={id} />
    </>
  )
}

export default EditDoctorPage
