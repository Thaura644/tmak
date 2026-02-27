/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'

import React from 'react'
import { memberService } from '@/../backend/services/memberService'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let member: any = null

  try {
    member = await memberService.getMemberBySlug(slug)
  } catch (error) {
    console.error('Member detail page data fetch failed:', error)
  }

  if (!member) {
    return notFound()
  }

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-mangogreen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/members" className="text-white/70 hover:text-white flex items-center gap-2 mb-8 transition-colors">
            <Icons.ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white">
              {member.logo?.url ? (
                <Image
                  src={member.logo.url}
                  alt={member.organization_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-4xl text-slate-300 font-bold uppercase">
                  {member.organization_name.substring(0, 2)}
                </div>
              )}
            </div>

            <div className="flex-1 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-mangoyellow text-mangogreen text-xs font-bold rounded-full uppercase tracking-widest">
                  {member.category?.name || 'Member'}
                </span>
                {member.membership_status === 'active' && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Icons.CheckCircle className="w-3 h-3 text-mangoyellow" />
                    Verified Member
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{member.organization_name}</h1>
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Icons.MapPin className="w-5 h-5 text-mangoyellow" />
                  {member.county} County
                </div>
                {member.verified_since && (
                  <div className="flex items-center gap-2">
                    <Icons.Calendar className="w-5 h-5 text-mangoyellow" />
                    Member since {member.verified_since}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-serif font-bold text-mangogreen mb-6 border-b pb-4">Organization Overview</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                {member.description || "No description provided."}
              </div>
            </section>

            {member.certifications && member.certifications.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-2xl font-serif font-bold text-mangogreen mb-6">Certifications & Standards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.certifications.map((cert: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 bg-mangoyellow/20 rounded-lg flex items-center justify-center text-mangoyellow-accent">
                        <Icons.Award className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-slate-700">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {member.export_markets && member.export_markets.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-2xl font-serif font-bold text-mangogreen mb-6">Global Market Reach</h2>
                <div className="flex flex-wrap gap-3">
                  {member.export_markets.map((market: any, i: number) => (
                    <span key={i} className="px-6 py-2 bg-mangogreen/5 text-mangogreen border border-mangogreen/10 rounded-full font-bold">
                      {market.market}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-serif font-bold text-mangogreen mb-6">Contact Information</h3>
              <div className="space-y-6">
                {member.contact_person && (
                  <div className="flex items-start gap-4">
                    <Icons.User className="w-5 h-5 text-mangoyellow mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Person</p>
                      <p className="font-bold text-slate-700">{member.contact_person}</p>
                    </div>
                  </div>
                )}
                {member.email && (
                  <div className="flex items-start gap-4">
                    <Icons.Mail className="w-5 h-5 text-mangoyellow mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                      <a href={`mailto:${member.email}`} className="font-bold text-mangogreen hover:underline">{member.email}</a>
                    </div>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-start gap-4">
                    <Icons.Phone className="w-5 h-5 text-mangoyellow mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                      <p className="font-bold text-slate-700">{member.phone}</p>
                    </div>
                  </div>
                )}
                {member.website && (
                  <div className="flex items-start gap-4">
                    <Icons.Globe className="w-5 h-5 text-mangoyellow mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website</p>
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="font-bold text-mangogreen hover:underline truncate block max-w-[200px]">
                        {member.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full mt-8 bg-mangogreen text-white py-4 rounded-xl font-bold hover:bg-mangogreen/90 transition shadow-lg flex items-center justify-center gap-2">
                <Icons.Send className="w-5 h-5" />
                Inquire Now
              </button>
            </section>

            <div className="bg-mangoyellow p-8 rounded-2xl">
              <Icons.ShieldCheck className="w-12 h-12 text-mangogreen mb-4" />
              <h4 className="text-xl font-bold text-mangogreen mb-2">Verified Supplier</h4>
              <p className="text-sm text-mangogreen/70 leading-relaxed">
                This member has undergone T-MAK&apos;s quality verification process and is cleared for international trade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
