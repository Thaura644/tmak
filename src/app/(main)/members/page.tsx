export const dynamic = "force-dynamic"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MembersFilter } from '@/components/MembersFilter'
import * as Icons from 'lucide-react'
import { getMembers, getMemberCategories, getStatistics } from '@/lib/data'

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1
  const categoryIds = typeof params.category === 'string' ? [params.category] : Array.isArray(params.category) ? params.category : []
  const county = typeof params.county === 'string' ? params.county : undefined
  const search = typeof params.search === 'string' ? params.search : undefined

  const { docs: members, totalDocs, totalPages, page: currentPage } = await getMembers({
    category: categoryIds,
    county,
    search,
    page,
  })

  const categories = await getMemberCategories()
  const stats = await getStatistics()

  return (
    <main className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72">
            <MembersFilter categories={categories as any} />
          </aside>
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {members.map((member) => (
                <article key={member.id} className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 mb-4">
                    {member.logoUrl && <Image src={member.logoUrl} alt={member.organizationName} fill className="object-cover" />}
                  </div>
                  <h3 className="font-bold text-lg text-mangogreen mb-1">{member.organizationName}</h3>
                  <p className="text-slate-500 text-sm mb-4">{member.county} County</p>
                  <Link href={`/members/${member.slug}`} className="bg-mangoyellow/10 text-mangogreen px-4 py-1.5 rounded text-sm font-bold">
                    View Profile
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
