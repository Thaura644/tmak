export const dynamic = 'force-dynamic'
import React from 'react'
import { StatisticsCharts } from '@/components/StatisticsCharts'
import { getStatistics } from '@/lib/data'
import Link from 'next/link'

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const year = typeof params.year === 'string' ? parseInt(params.year) : 2023
  const stats = await getStatistics(year)

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        <StatisticsCharts data={stats as any} />
      </div>
    </div>
  )
}
