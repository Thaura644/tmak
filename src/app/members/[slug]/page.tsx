export const dynamic = "force-dynamic"
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Member, Media, MemberCategory } from '@/types/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'members',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs || docs.length === 0) return {}

  const member = docs[0] as unknown as Member

  return {
    title: member.organization_name,
    description: member.description?.substring(0, 160),
    openGraph: {
      title: `${member.organization_name} | T-MAK Member`,
      description: member.description?.substring(0, 160),
      images: typeof member.logo === 'object' && member.logo !== null ? [(member.logo as Media).url] : [],
    },
  }
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'members',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs || docs.length === 0) {
    notFound()
  }

  const member = docs[0] as unknown as Member

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-mangogreen h-32 w-full"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white bg-white shadow-md">
              {typeof member.logo === 'object' && member.logo !== null ? (
                <Image
                  src={(member.logo as Media).url}
                  alt={member.organization_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-50 text-2xl font-bold uppercase">
                  {member.organization_name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif font-bold mb-2 text-mangogreen">{member.organization_name}</h1>
              <p className="text-xl text-mangoyellow-accent font-semibold mb-6">
                {typeof member.category === 'object' ? (member.category as MemberCategory).name : member.category}
              </p>

              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-3 border-b pb-2 text-slate-800">About the Organization</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{member.description}</p>
              </div>

              {member.certifications && member.certifications.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3 border-b pb-2 text-slate-800">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, i) => (
                      <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.export_markets && member.export_markets.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3 border-b pb-2 text-slate-800">Export Markets</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.export_markets.map((market, i) => (
                      <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                        {market.market}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-fit">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-slate-400 text-xs">Contact Information</h3>
              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Contact Person</p>
                  <p className="text-slate-900 font-medium">{member.contact_person}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">County</p>
                  <p className="text-slate-900 font-medium">{member.county}</p>
                </div>
                {member.phone && (
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Phone</p>
                    <p className="text-slate-900 font-medium">{member.phone}</p>
                  </div>
                )}
                {member.email && (
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Email</p>
                    <a href={`mailto:${member.email}`} className="text-mangogreen hover:text-mangoyellow-accent transition font-medium underline decoration-mangoyellow/30">{member.email}</a>
                  </div>
                )}
                {member.website && (
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Website</p>
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-mangogreen hover:text-mangoyellow-accent transition font-medium break-all underline decoration-mangoyellow/30">{member.website}</a>
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Member Since</p>
                  <p className="text-slate-900 font-medium">{member.verified_since || member.year_joined || '2023'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
