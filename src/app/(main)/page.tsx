/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProduceMarquee from '@/components/ProduceMarquee'
import * as Icons from 'lucide-react'
import { Statistic, MemberCategory, Media } from '@/types/payload'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch Hero/Organization info
  const { docs: orgRoles } = await payload.find({
    collection: 'organization_role',
    limit: 1,
  })
  const orgRole = orgRoles[0] as any

  // Fetch Value Chain Platform
  const { docs: vcPlatforms } = await payload.find({
    collection: 'value_chain_platform',
    limit: 1,
  })
  const vcPlatform = vcPlatforms[0] as any

  // Fetch Statistics for Data Snapshot
  const { docs: statsDocs } = await payload.find({
    collection: 'statistics',
    where: {
      year: { equals: 2023 }
    },
    limit: 10,
  })
  const stats = statsDocs as unknown as Statistic[]

  // Fetch Member Categories
  const { docs: categoriesDocs } = await payload.find({
    collection: 'member_categories',
  })
  const categories = categoriesDocs as unknown as MemberCategory[]

  // Fetch Partners
  const { docs: partnersDocs } = await payload.find({
    collection: 'partners',
    limit: 10,
  })
  const partners = partnersDocs as any[]

  const heroImage = typeof orgRole?.banner_image === 'object' && orgRole.banner_image !== null
    ? (orgRole.banner_image as Media).url
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuCINAOCgbzbCG5B1PyrJLQcbYwzAXw90_4mQoy8J1LwFeDc1jBfRDL8pXIZvAvao8kVmTaKe23ohQi5rr1kzFMj4nn8L5h5iafa2V_MfdXnvVgWltFkjGuKx8Vr7dPn1d-PD4O3ESheNM470_5QDVpw5EtWd9_zM3-b39M0g3eRxkC3rT13jaa0V-EMdy-zUwY-vqt1DMRYfUwUDcuff4b-6qCFLYTGqdL11Oni0Wgp29qOyPB2Q4r_7JgDOSGEsl-mOCCWJ0nXQPZc"

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[750px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="The Mango Association of Kenya"
            fill
            className="object-cover"
            priority
          />
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
              <Link href="/cms" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded font-bold text-lg text-center hover:bg-white hover:text-tmak-green transition w-full sm:w-auto">
                Become a Member
              </Link>
              <div className="relative group w-full sm:w-auto">
                <button className="bg-mangogreen text-white px-8 py-4 rounded font-bold text-lg text-center flex items-center justify-center gap-2 hover:bg-mangogreen-light transition w-full">
                  Member Directory <Icons.ChevronDown className="w-5 h-5" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                  <Link href="/members" className="block px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition border-b border-gray-50">All Members</Link>
                  {categories.slice(0, 8).map((cat) => (
                    <Link key={cat.id} href={`/members?category=${cat.id}`} className="block px-6 py-3 text-sm text-slate-600 hover:bg-slate-50 transition border-b border-gray-50 last:border-0">{cat.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produce Marquee */}
      <ProduceMarquee />

      {/* Strategic Functions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-tmak-green mb-6 border-l-4 border-tmak-accent pl-6 uppercase tracking-wider">
                Strategic Functions of T-MAK
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                As the peak industry body, T-MAK works in collaboration with the Government of Kenya and international partners to ensure the sustainability, profitability, and global competitiveness of the mango sector.
              </p>
              <ul className="space-y-4">
                {(orgRole?.strategic_functions as any[])?.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-tmak-green text-white flex items-center justify-center text-xs shadow-sm">✓</span>
                    <span className="leading-relaxed">{item.function}</span>
                  </li>
                )) || (
                    <>
                      <li className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-tmak-green text-white flex items-center justify-center text-xs shadow-sm">✓</span>
                        <span><strong>Policy Advocacy:</strong> Shaping the regulatory environment for favorable trade.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-tmak-green text-white flex items-center justify-center text-xs shadow-sm">✓</span>
                        <span><strong>Quality Assurance:</strong> Enforcing standards for domestic and export markets.</span>
                      </li>
                    </>
                  )}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Registered Farmers', value: '45k+' },
                  { label: 'Active Counties', value: '15' },
                  { label: 'Export Partners', value: '120+' },
                  { label: 'Market Stability', value: '85%' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-slate-50 rounded-lg group hover:bg-mangogreen transition-colors">
                    <div className="text-4xl font-bold text-tmak-green mb-2 group-hover:text-mangoyellow">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider group-hover:text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Chain Platform */}
      <section id="value-chain" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Value Chain Platform</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Connecting every node of the ecosystem to maximize efficiency and value creation from farm to fork.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {vcPlatform?.nodes?.map((node: any, i: number) => {
              const IconComponent = (Icons as any)[node.icon || 'Package'] || Icons.Package
              return (
                <div key={i} className="group p-8 border border-gray-100 rounded-2xl hover:border-tmak-accent transition duration-300 bg-gray-50 hover:bg-white hover:shadow-xl">
                  <div className="w-14 h-14 bg-tmak-green text-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{node.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{node.description}</p>
                  <Link href={node.link || "#"} className="text-tmak-green font-semibold inline-flex items-center hover:gap-2 transition-all">
                    Learn More <span className="ml-1">→</span>
                  </Link>
                </div>
              )
            })}
            {(!vcPlatform || !vcPlatform.nodes || vcPlatform.nodes.length === 0) && (
              <div className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Value chain nodes not defined in CMS.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Membership Categories */}
      <section id="membership" className="py-24 bg-tmak-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join Our Ecosystem</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Standardized categories designed to foster professional growth across the industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((cat, i) => (
              <div key={cat.id} className={`p-10 rounded-xl text-center border transition ${i === 1 ? 'bg-white/10 border-white/20 scale-105 shadow-2xl' : 'bg-white/5 border-white/10'}`}>
                <h3 className="text-2xl font-bold mb-4 text-tmak-accent">{cat.name}</h3>
                <p className="text-white/80 mb-6">
                  {i === 0 ? 'Individual farmers and Co-operatives looking to certify their orchards.' : i === 1 ? 'Logistics providers and export houses seeking vetted suppliers.' : 'Retailers and food manufacturers sourcing high-quality mangoes.'}
                </p>
                <Link href="/cms" className={`w-full block py-3 rounded font-bold transition ${i === 1 ? 'bg-tmak-accent text-tmak-green' : 'border border-white/30 hover:bg-white hover:text-tmak-green'}`}>
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Data Snapshot */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Industry Data Snapshot</h2>
            <p className="text-slate-500 font-medium">Mango Production by Major County (Annual Tonnage - 2023)</p>
          </div>
          <div className="bg-slate-50 p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mangoyellow/5 rounded-full -mr-16 -mt-16"></div>
            <div className="space-y-6 relative z-10">
              {stats.filter(s => s.category === 'production').slice(0, 5).map((s, i) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>{s.label}</span>
                    <span>{s.value.toLocaleString()} Tons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ${i === 0 ? 'bg-tmak-green' : i === 1 ? 'bg-green-600' : i === 2 ? 'bg-green-500' : i === 3 ? 'bg-green-400' : 'bg-green-300'}`}
                      style={{ width: `${Math.min(100, (s.value / 200000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {stats.filter(s => s.category === 'production').length === 0 && (
                <div className="text-center py-10 text-gray-400 italic">No production data available for 2023.</div>
              )}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-[10px] text-slate-400 italic uppercase tracking-widest">
              *Source: T-MAK Annual Sector Report 2023. Figures rounded to nearest thousand.
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-12 uppercase tracking-widest text-slate-400 text-sm">Our Strategic Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {partners.map((partner) => {
              const logoUrl = typeof partner.logo === 'object' && partner.logo !== null ? (partner.logo as Media).url : null
              if (logoUrl) {
                return (
                  <div key={partner.id} className="relative w-40 h-20">
                    <Image src={logoUrl} alt={partner.name} fill className="object-contain" />
                  </div>
                )
              }
              return (
                <div key={partner.id} className="text-2xl font-bold text-gray-400 uppercase">{partner.name}</div>
              )
            })}
            {partners.length === 0 && (
              <>
                <div className="text-2xl font-bold text-gray-400 uppercase tracking-tighter">MINISTRY OF AGRICULTURE</div>
                <div className="text-2xl font-bold text-gray-400 uppercase tracking-tighter">KALRO</div>
                <div className="text-2xl font-bold text-gray-400 uppercase tracking-tighter">USAID</div>
                <div className="text-2xl font-bold text-gray-400 uppercase tracking-tighter">KEPHIS</div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
