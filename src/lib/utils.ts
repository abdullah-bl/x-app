import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
  value: number,
  currency: "USD" | "SAR" = "USD"
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

export function formatDateToSQL(date: Date) {
  const pad = (num: number) => String(num).padStart(2, "0")

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Months are zero-indexed
  const day = pad(date.getDate())

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function formatDate(date: Date | string | undefined) {
  if (!date) return "N/A"
  const d = new Date(date)
  return d?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(date: Date | string | undefined) {
  if (!date) return "N/A"
  const d = new Date(date)
  return d?.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}
