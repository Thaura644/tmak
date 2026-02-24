export const dynamic = "force-dynamic"
import React from 'react'
import { getMemberBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await getMemberBySlug(slug)

  if (!member) notFound()

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-8 mb-12">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border">
            {member.logoUrl && <Image src={member.logoUrl} alt={member.organizationName} fill className="object-cover" />}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{member.organizationName}</h1>
            <p className="text-xl text-slate-500">{member.county} County</p>
          </div>
        </div>
        <div className="prose max-w-none">
          <p>{member.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  )
}
