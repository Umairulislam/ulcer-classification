import { z } from "zod"

const patientSchema = (_isUpdate = false) =>
  z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email format").optional(),
    phone_no: z.string().min(10, "Phone Number must be at least 10 digits"),
    age: z.coerce.number().refine((val) => !isNaN(val), "Age must be a number"),
    doctor_id: z.object({
      id: z.string().min(1, "Doctor ID is required"),
      first_name: z.string().min(1),
    }),
    gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  })

export type PatientFormValues = z.infer<ReturnType<typeof patientSchema>>
export default patientSchema
