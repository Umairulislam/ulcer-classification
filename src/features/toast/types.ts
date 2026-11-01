export type ToastSeverity = "success" | "error" | "info" | "warning"

export interface Toast {
  id: string
  message: string
  severity: ToastSeverity
}

export interface ToastState {
  queue: Toast[]
}
