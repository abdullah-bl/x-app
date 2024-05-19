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
