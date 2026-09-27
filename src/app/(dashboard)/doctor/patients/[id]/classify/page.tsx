import type { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"
import ClassifyForm from "./ClassifyForm"

export const metadata: Metadata = {
  title: "Classify Patient",
}

interface ClassifyPageProps {
  // Next.js 15/16 — route params are async, must be awaited before use.
  params: Promise<{ id: string }>
}

const ClassifyPage = async ({ params }: ClassifyPageProps) => {
  const { id } = await params

  return (
    <>
      <PageHeader
        title="Classify Patient"
        subtitle="Upload an ulcer image for AI-based classification"
      />
      <ClassifyForm patientId={id} />
    </>
  )
}

export default ClassifyPage
