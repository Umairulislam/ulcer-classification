import { z } from "zod"

const updateProfileSchema = z.object({
  first_name: z.string().min(2, "First Name must be at least 2 characters").max(50),
  last_name: z.string().min(2, "Last Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format"),
  phone_no: z.string().min(10, "Phone Number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>
export default updateProfileSchema
