import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple function to format a number as currency (I wouldnt legitmately do it this way)
// Would most likely use a library for this similar to moment but for currency or something
// I also would probably have a /lib/utils folder dedicated to topical function to organize if
// custom methods get too many.
export function formatToCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  )}`
}
