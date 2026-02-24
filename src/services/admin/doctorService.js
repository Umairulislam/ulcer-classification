import { apiManager } from "@/helpers/apiManager"

export async function getDoctors({ page, perPage, search, status }) {
  const params = { page, perPage }
  if (search) params.search = search
  if (status && status !== "all") params.status = status

  const { data } = await apiManager.get("doctor/all", { params })
  return data
}

export async function createDoctor(payload) {
  const { data } = await apiManager.post("doctor/create", payload)
  return data
}

export async function updateDoctor(id, payload) {
  const { data } = await apiManager.patch(`doctor/update/${id}`, payload)
  return data
}

export async function deleteDoctor(id) {
  const { data } = await apiManager.delete(`doctor/delete/${id}`)
  return data
}

export async function toggleDoctorStatus(id, currentStatus) {
  const { data } = await apiManager.patch(`doctor/update/status/${id}`, {
    status: currentStatus === "active" ? "deactive" : "active",
  })
  return data
}
