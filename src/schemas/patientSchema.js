import * as yup from "yup"

const patientSchema = (isUpdate = false) => {
    // Default to false
    return yup.object({
        name: yup
            .string()
            .required("Name is required")
            // .matches(/^[a-zA-Z]+$/, "Name must contain only alphabets")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be at most 50 characters"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        phone_no: yup
            .string()
            .required("Phone Number is required")
            .min(10, "Phone Number must be at least 10 digits"),
        doctor_id: yup
            .string()
            .required("doctor is required")
    })
}

export default patientSchema
