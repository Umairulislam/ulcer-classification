import { z } from "zod"

const baseDoctorSchema = z.object({
  first_name: z.string().min(2, "First Name must be at least 2 characters").max(50),
  last_name: z.string().min(2, "Last Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format"),
  phone_no: z.string().min(10, "Phone Number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
})

export const createDoctorSchema = baseDoctorSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const updateDoctorSchema = baseDoctorSchema

export type DoctorFormValues = z.infer<typeof createDoctorSchema>
export type UpdateDoctorFormValues = z.infer<typeof updateDoctorSchema>
