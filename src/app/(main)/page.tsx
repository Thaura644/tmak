export const dynamic = "force-dynamic"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProduceMarquee from '@/components/ProduceMarquee'
import * as Icons from 'lucide-react'
import { getOrganizationInfo, getStatistics, getMemberCategories, getPartners } from '@/lib/data'

export default async function HomePage() {
  const orgRole = await getOrganizationInfo()
  const stats = await getStatistics()
  const categories = await getMemberCategories()
  const partners = await getPartners()

  const heroImage = orgRole?.bannerImageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCINAOCgbzbCG5B1PyrJLQcbYwzAXw90_4mQoy8J1LwFeDc1jBfRDL8pXIZvAvao8kVmTaKe23ohQi5rr1kzFMj4nn8L5h5iafa2V_MfdXnvVgWltFkjGuKx8Vr7dPn1d-PD4O3ESheNM470_5QDVpw5EtWd9_zM3-b39M0g3eRxkC3rT13jaa0V-EMdy-zUwY-vqt1DMRYfUwUDcuff4b-6qCFLYTGqdL11Oni0Wgp29qOyPB2Q4r_7JgDOSGEsl-mOCCWJ0nXQPZc"

  const strategicFunctions = orgRole?.strategicFunctions
    ? (typeof orgRole.strategicFunctions === 'string' ? orgRole.strategicFunctions.split(';') : orgRole.strategicFunctions)
    : []

  return (
    <main>
      <section className="relative h-[750px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={heroImage} alt="The Mango Association of Kenya" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              {orgRole?.title || "The Mango Association of Kenya (T-MAK)"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
              National coordinating authority, value chain platform, and market linkage enabler for Kenya&apos;s mango industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/#value-chain" className="bg-tmak-accent text-tmak-green px-8 py-4 rounded font-bold text-lg text-center hover:scale-105 transition shadow-lg w-full sm:w-auto">
                Explore the Value Chain
              </Link>
              <Link href="/register" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded font-bold text-lg text-center hover:bg-white hover:text-tmak-green transition w-full sm:w-auto">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProduceMarquee />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-tmak-green mb-6 border-l-4 border-tmak-accent pl-6 uppercase tracking-wider">
                Strategic Functions of T-MAK
              </h2>
              <ul className="space-y-4">
                {strategicFunctions.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-tmak-green text-white flex items-center justify-center text-xs shadow-sm">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Industry Data Snapshot</h2>
          </div>
          <div className="bg-slate-50 p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              {stats.slice(0, 5).map((s, i) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>{s.label}</span>
                    <span>{s.value.toLocaleString()} Tons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="h-4 rounded-full bg-tmak-green" style={{ width: `${Math.min(100, (s.value / 200000) * 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {partners.map((partner) => (
              <div key={partner.id} className="relative w-40 h-20">
                <Image src={partner.logoUrl} alt={partner.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
