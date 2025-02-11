import * as yup from "yup"

const classificationSchema = yup.object({
    image: yup
        .mixed()
        .required("Image is required")
        .test("fileType", "Only jpg, jpeg, and png files are allowed", (value) => {
            if (!value || value.length === 0) return false
            const file = value[0]
            return ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
        }),
})

export default classificationSchema
