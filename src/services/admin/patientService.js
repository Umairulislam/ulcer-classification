import { apiManager } from "@/helpers/apiManager"

export async function getPatients({ page, perPage, search, doctor_id }) {
  const params = { page, perPage }
  if (search) params.search = search
  if (doctor_id) params.doctor_id = doctor_id

  const { data } = await apiManager.get("patient/all", { params })
  return data
}

export async function getPatientById(id) {
  const { data } = await apiManager.get(`patient/${id}`)
  return data
}

export async function createPatient(payload) {
  const { data } = await apiManager.post("patient/add", payload)
  return data
}

export async function updatePatient(id, payload) {
  const { data } = await apiManager.patch(`patient/${id}`, payload)
  return data
}

export async function deletePatient(id) {
  const { data } = await apiManager.delete(`patient/${id}`)
  return data
}
