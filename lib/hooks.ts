import { useState, useEffect } from "react";

interface Company {
  id: number;
  name: string;
  description: string;
  location: string;
  website: string;
  revenue: number;
  employees: number
}

interface UseCompaniesResult {
  data: Company[] | null;
  isLoading: boolean;
  error: string | null;
}

export const useCompanies = (): UseCompaniesResult => {
  const [data, setData] = useState<Company[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://venefish.enesien.com/api/companies");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result: Company[] = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
        alert(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { data, isLoading, error };
};

export default useCompanies;
