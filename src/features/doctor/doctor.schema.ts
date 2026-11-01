import { z } from "zod"

export type DoctorFormMode = "create" | "edit"

export const getDoctorSchema = (mode: DoctorFormMode) =>
  z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    phone_no: z.string().min(1, "Phone number is required"),
    gender: z.enum(["male", "female"], {
      message: "Select a gender",
    }),
    password:
      mode === "create"
        ? z.string().min(6, "Password must be at least 6 characters")
        : z.string().optional(),
  })

// Single shared type for the form's React Hook Form state, used in both modes.
export interface DoctorFormValues {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  gender: "male" | "female"
  password?: string
}
