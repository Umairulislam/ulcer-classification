import * as yup from "yup"

const adminProfileSchema = yup.object({
    first_name: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters")
        .max(50, "First Name must be at most 50 characters"),
    last_name: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters")
        .max(50, "Last Name must be at most 50 characters"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    phone_no: yup
        .string()
        .required("Phone Number is required")
        .min(10, "Phone Number must be at least 10 digits"),
    gender: yup
        .string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Invalid gender"),
})


export default adminProfileSchema
