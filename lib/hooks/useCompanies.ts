// Note: I think custom hooks should be placed in a folder of its own.
// There are also a few very good hook libraries for many generic uses.
import { useState, useEffect } from "react"

// Must match API response JSON - Im not sure if the returned data could be different without an API
interface Company {
  id: number
  name: string
  description: string
  location: string
  website: string
  revenue: number
  employees: number
}

interface UseCompaniesResult {
  data: Company[] | null
  isLoading: boolean
  hasError: string | null
}

const API_ENDPOINT = "https://venefish.enesien.com/api/companies"

export const useCompanies = (): UseCompaniesResult => {
  const [data, setData] = useState<Company[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Toggle Loading and Wait for Response
        setIsLoading(true)
        const response = await fetch(API_ENDPOINT)

        // Failuire produces and Error
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        // Create array of Companies from JSON (I believe await is needed here)
        const result: Company[] = await response.json()

        // Good to Go
        setData(result)
      } catch (err: any) {
        setHasError(err.message || "An unexpected error occurred.")
        alert(err.message || "An unexpected error occurred.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  return { data, isLoading, hasError }
}

export default useCompanies
