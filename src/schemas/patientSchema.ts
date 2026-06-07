import { z } from "zod"

export const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format").optional(),
  phone_no: z.string().min(10, "Phone Number must be at least 10 digits"),
  age: z.number({ message: "Age is required" }).min(0, "Age must be a positive number"),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  doctor_id: z.object({
    id: z.string().min(1, "Doctor ID is required"),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
  }),
})

export type PatientFormValues = z.infer<typeof patientSchema>

export type UpdatePatientPayload = Omit<Partial<PatientFormValues>, "doctor_id"> & {
  doctor_id?: string
}
