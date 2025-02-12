import * as yup from "yup"

const patientSchema = (isUpdate = false) => {
    // Default to false
    return yup.object({
        name: yup
            .string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be at most 50 characters"),
        // email: yup
        //     .string()
        //     .email("Invalid email format"),
        phone_no: yup
            .string()
            .required("Phone Number is required")
            .min(10, "Phone Number must be at least 10 digits"),
        age: yup
            .number()
            .typeError("Age must be a number")
            .required("Age is required"),
        // doctor_id: yup
        //     .object()
        //     .required("Doctor is required"),
        // .shape({
        //     id: yup.string().required("Doctor ID is required"),
        //     first_name: yup.string().required()
        // }),
        gender: yup
            .string()
            .required("Gender is required")
            .oneOf(["male", "female", "other"], "Invalid gender"),

    })
}

export default patientSchema
