import { z } from "zod"

export const classificationSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Image is required")
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png"].includes(files?.[0]?.type),
      "Only jpg, jpeg, and png files are allowed"
    ),
})

export type ClassificationFormValues = z.infer<typeof classificationSchema>
