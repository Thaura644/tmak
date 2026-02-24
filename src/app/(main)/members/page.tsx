/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic"
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { MembersFilter } from '@/components/MembersFilter'
import { Member, MemberCategory, Media, Statistic } from '@/types/payload'
import * as Icons from 'lucide-react'

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  let members: Member[] = []
  let categories: MemberCategory[] = []
  let stats: Statistic[] = []
  let totalDocs = 0
  let totalPages = 1
  let currentPage = 1

  try {
    const payload = await getPayload({ config })

    const page = typeof params.page === 'string' ? parseInt(params.page) : 1
    const categoryIds = typeof params.category === 'string' ? [params.category] : Array.isArray(params.category) ? params.category : []
    const county = typeof params.county === 'string' ? params.county : undefined
    const search = typeof params.search === 'string' ? params.search : undefined

    const where: any = {
      membership_status: {
        equals: 'active',
      },
    }

    if (categoryIds.length > 0) {
      where.category = {
        in: categoryIds,
      }
    }

    if (county && county !== 'All Counties') {
      where.county = {
        contains: county,
      }
    }

    if (search) {
      where.organization_name = {
        contains: search,
      }
    }

    const result = await payload.find({
      collection: 'members',
      where,
      page,
      limit: 12,
      sort: '-year_joined',
    })

    members = result.docs as unknown as Member[]
    totalDocs = result.totalDocs
    totalPages = result.totalPages
    currentPage = result.page || 1

    const { docs: catDocs } = await payload.find({
      collection: 'member_categories',
    })
    categories = catDocs as unknown as MemberCategory[]

    // Fetch stats for the dashboard
    const { docs: statsDocs } = await payload.find({
      collection: 'statistics',
      where: {
        category: { equals: 'production' },
        year: { equals: 2023 }
      },
      limit: 5,
    })
    stats = statsDocs as unknown as Statistic[]
  } catch (error) {
    console.error('Members page data fetch failed:', error)
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <header className="bg-mangogreen text-white shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Icons.Users className="w-6 h-6 text-mangoyellow" />
            Member Directory
          </h1>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/statistics" className="hover:text-mangoyellow transition-colors">Market Data</Link>
            <Link href="/resources" className="hover:text-mangoyellow transition-colors">GAP Standards</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Production Statistics Dashboard */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-mangogreen">National Production Statistics</h2>
              <p className="text-sm text-slate-500">Real-time data insights across key producing counties (Metric Tons)</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-3 h-3 bg-mangogreen rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">2023 Forecasted Yield</span>
            </div>
          </div>
          <div className="p-8 bg-slate-50/50">
            <div className="flex items-end justify-between h-48 max-w-4xl mx-auto gap-2 md:gap-6">
              {stats.map((s, i) => {
                const height = Math.min(100, (s.value / 150000) * 100)
                return (
                  <div key={s.id} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-full rounded-t-sm relative group transition-all duration-1000 ${i === 0 ? 'bg-mangogreen' : i === 1 ? 'bg-mangogreen/90' : i === 2 ? 'bg-mangogreen/80' : i === 3 ? 'bg-mangogreen/70' : 'bg-mangogreen/60'
                        }`}
                      style={{ height: `${height}%` }}
                    >
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-mangogreen text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {s.value.toLocaleString()} MT
                      </span>
                    </div>
                    <span className="mt-2 text-xs font-bold text-slate-600 truncate w-full text-center">{s.label}</span>
                  </div>
                )
              })}
              {stats.length === 0 && (
                <div className="w-full text-center text-gray-400 italic">No statistical data available for chart.</div>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <MembersFilter categories={categories} />
            <div className="bg-mangogreen text-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-mangoyellow mb-2">Institutional Advantage</h4>
              <p className="text-xs leading-relaxed text-slate-200">
                T-MAK verified members are audited for GAP (Good Agricultural Practices) compliance, ensuring premium market access.
              </p>
            </div>
          </aside>

          {/* Member Grid */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-slate-500 font-medium">
                Showing <span className="text-mangogreen font-bold">{totalDocs}</span> active members
              </p>
              <div className="flex items-center text-xs space-x-2">
                <span className="text-slate-400">Sort by:</span>
                <select className="bg-transparent border-none text-mangogreen font-bold focus:ring-0 cursor-pointer text-xs">
                  <option>Recently Joined</option>
                  <option>Name (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {members.map((member) => (
                <article key={member.id} className="member-card bg-white border border-slate-200 rounded-xl p-5 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-gray-50">
                      {typeof member.logo === 'object' && member.logo !== null ? (
                        <Image
                          src={(member.logo as Media).url}
                          alt={member.organization_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-xs text-gray-300 font-bold uppercase">
                          {member.organization_name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${(member.category as { name: string }).name === 'Producer' ? 'bg-green-100 text-green-800' :
                        (member.category as { name: string }).name === 'Trader' || (member.category as { name: string }).name === 'Exporter' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                      }`}>
                      {typeof member.category === 'object' ? member.category.name : 'Member'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-mangogreen mb-1 line-clamp-1">{member.organization_name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Icons.MapPin className="w-4 h-4 mr-1 text-mangoyellow" />
                    {member.county} County
                  </div>
                  <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium italic">
                      {member.verified_since ? `Verified Member since ${member.verified_since}` : `Member since ${member.year_joined || '2023'}`}
                    </span>
                    <Link
                      href={`/members/${member.slug}`}
                      className="bg-mangoyellow/10 text-mangogreen border border-mangogreen/20 px-4 py-1.5 rounded text-sm font-bold hover:bg-mangoyellow transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </article>
              ))}
              {members.length === 0 && (
                <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                  <Icons.SearchX className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No members match your current filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Link
                      href={{ query: { ...params, page: Math.max(1, (currentPage || 1) - 1).toString() } }}
                      className="px-3 py-1 rounded border border-slate-300 text-slate-500 hover:bg-mangogreen hover:text-white transition-colors"
                    >
                      Prev
                    </Link>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <Link
                        href={{ query: { ...params, page: (i + 1).toString() } }}
                        className={`px-3 py-1 rounded ${(currentPage || 1) === i + 1 ? 'bg-mangogreen text-white font-bold' : 'border border-slate-300 text-slate-500 hover:bg-mangogreen/10'
                          }`}
                      >
                        {i + 1}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={{ query: { ...params, page: Math.min(totalPages, (currentPage || 1) + 1).toString() } }}
                      className="px-3 py-1 rounded border border-slate-300 text-slate-500 hover:bg-mangogreen hover:text-white transition-colors"
                    >
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
