"use client"
import useCompanies from '@/lib/hooks'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// TODO: Convert to table, adjust styles, dble check instructions, organize files a lil diff
export default function Home() {

  const { data, isLoading, error } = useCompanies()

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-tl from-blue-400 to-blue-700 text-white space-y-6">
      <div className="bg-white/10 p-4">
        <div className="container">
          <h2 className="font-ornate text-2xl font-semibold tracking-tighter ">
            React Next.js Tester
          </h2>
        </div>
      </div>
      <div className="container">
        <Card>
          <CardHeader className="px-7">
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {isLoading && <li>Loading</li>}
              {error && <li>Error: {error}</li>}
              {data?.map((company) => (
                <li key={company.id}>
                  <strong>{company.name}</strong> - {company.description}, {company.location}
                  {company.website} {company.revenue} {company.employees}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            Total Employees: {data?.reduce((total, item) => total + item.employees, 0)}
            Total Revenue: {data?.reduce((total, item) => total + item.revenue, 0)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

