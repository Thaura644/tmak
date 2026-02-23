/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { StatisticsCharts } from '@/components/StatisticsCharts'
import { Statistic } from '@/types/payload'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const payload = await getPayload({ config })

  const year = typeof params.year === 'string' ? parseInt(params.year) : 2023

  const where: any = {}
  if (year) {
    where.year = {
      equals: year,
    }
  }

  const { docs: statsDocs } = await payload.find({
    collection: 'statistics',
    where,
    limit: 100,
  })
  const stats = statsDocs as unknown as Statistic[]

  // Get available years for filter
  const allStatsRes = await payload.find({
    collection: 'statistics',
    limit: 1000,
  })
  const allStats = allStatsRes.docs as unknown as Statistic[]
  const availableYears = Array.from(new Set(allStats.map(s => s.year))).sort((a, b) => b - a)

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <header className="bg-mangogreen text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Market Intelligence & Data</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Real-time insights into Kenya&apos;s mango value chain, production volumes, and export trends.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-mangoyellow/20 rounded-full flex items-center justify-center text-mangoyellow-accent">
                    <Icons.Calendar className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reporting Year</p>
                    <p className="font-bold text-slate-700">{year}</p>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap">
                {availableYears.map(y => (
                    <Link
                        key={y}
                        href={`/statistics?year=${y}`}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition ${year === y ? 'bg-mangogreen text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        {y}
                    </Link>
                ))}
                {availableYears.length === 0 && (
                    <span className="text-sm text-slate-400">Defaulting to 2023 data</span>
                )}
            </div>
        </div>

        <StatisticsCharts data={stats} />

        <div className="mt-16 p-8 bg-mangogreen rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-2">Need detailed custom reports?</h3>
                <p className="text-white/70">T-MAK members get exclusive access to granular data, weekly market prices, and buyer contact lists.</p>
            </div>
            <Link href="/cms" className="bg-mangoyellow text-mangogreen px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-lg whitespace-nowrap">
                Become a Member
            </Link>
        </div>
      </div>
    </div>
  )
}
