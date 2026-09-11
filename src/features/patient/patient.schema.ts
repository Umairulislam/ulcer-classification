import { z } from "zod"

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone_no: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required").regex(/^\d+$/, "Age must be a number"),
  // Assumed values — adjust to match whatever the backend actually
  // accepts for gender.
  gender: z.enum(["male", "female", "other"], {
    message: "Select a gender",
  }),
  doctor_id: z.string().min(1, "Please assign a doctor"),
})

export type PatientFormValues = z.infer<typeof patientSchema>
