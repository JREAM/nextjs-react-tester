"use client"
import useCompanies from '@/lib/hooks/useCompanies'

import { LinkIcon, UsersIcon, AreaChart } from 'lucide-react'

import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatToCurrency } from "@/lib/utils"
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

// So this could be separated into a /component/table.tsx file if needed, it always depends how
// the Lead Dev prefers to organize things I think. It can get messy this way if we had a lot of components,
// but for the sake of this example Ill keep it slim.
export default function Home() {

  const { data, isLoading, hasError } = useCompanies()

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
            <CardTitle>Company Records</CardTitle>
            <CardDescription>A quick overview of our vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Table:Start */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Company</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                </TableRow>
              </TableHeader>
              {/* Note: Footer comes after Header or it wont align (I forget this a lot) */}
              <TableFooter>
                {/* Hook:Loading Indicator */}
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex items-center space-x-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[700px]" />
                          <Skeleton className="h-4 w-[700px]" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (!hasError && data?.length !== 0) ? (
                  <TableRow>
                    <TableCell colSpan={4} className="px-4 py-2"></TableCell>
                    <TableCell className="px-4 py-2">
                      <Badge variant="outline">
                        <AreaChart size={16} color="#ffffff" strokeWidth={1.5} className="mr-5" />
                        {/* Note: This is written ugly, but reduce can be null|undefined - ill just leave it like this for now */}
                        {formatToCurrency(data?.reduce((total, item) => total + (item.revenue || 0), 0) || 0)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-4 py-2">
                      <Badge variant="success">
                        <UsersIcon size={16} color="#ffffff" strokeWidth={1.5} className="mr-5" />{data?.reduce((total, item) => total + item.employees, 0)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableFooter>
              <TableBody>
                {/* Hook:Loading Indicator */}
                {isLoading && <TableRow><TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[700px]" />
                      <Skeleton className="h-4 w-[700px]" />
                    </div>
                  </div>
                </TableCell></TableRow>}
                {/* Hook:HasError Indicator */}
                {hasError && <TableRow><TableCell>HasError: {hasError}</TableCell></TableRow>}
                {/* Hook:Success and Populate */}
                {data?.map((company) => (
                  <TableRow key={company.id}>
                    {/* Note: Data Attributes are for code readability for the developer */}
                    <TableCell data-name="name" className="font-medium">{company.name}</TableCell>
                    <TableCell data-name="description">{company.description}</TableCell>
                    <TableCell data-name="location">{company.location}</TableCell>
                    <TableCell data-name="website">
                      {company?.website &&
                        <Link href={company.website}>
                          <LinkIcon size={16} color="#454545" strokeWidth={1.5} />
                        </Link>
                      }
                    </TableCell>
                    <TableCell data-name="revenue">
                      <Badge variant="outline">
                        <AreaChart size={16} color="#888888" strokeWidth={1.5} className="mr-5" />
                        {formatToCurrency(company.revenue)}
                      </Badge>
                    </TableCell>
                    <TableCell data-name="employees" className="text-right">
                      <Badge variant="outline">
                        <UsersIcon size={16} color="#888888" strokeWidth={1.5} className="mr-5" /> {company.employees}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Table:End */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

