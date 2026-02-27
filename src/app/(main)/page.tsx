/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { memberService } from '@/../backend/services/memberService'
import { statisticService } from '@/../backend/services/statisticService'
import { partnerService } from '@/../backend/services/partnerService'
import { contentService } from '@/../backend/services/contentService'

export default async function HomePage() {
  let stats: any[] = []
  let categories: any[] = []
  let partners: any[] = []
  let orgRole: any = null
  let vcPlatform: any = null

  try {
    stats = await statisticService.getStatistics(2023)
    categories = await memberService.getCategories()
    partners = await partnerService.getAllPartners()
    orgRole = await contentService.getOrganizationRole()
    vcPlatform = await contentService.getValueChainPlatform()
  } catch (error) {
    console.error('Home page data fetch failed:', error)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Mango Farm"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-mangoyellow text-mangogreen text-xs font-bold rounded-full mb-6 uppercase tracking-widest shadow-lg">
              Official Industry Peak Body
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1]">
              Advancing Kenya&apos;s <span className="text-mangoyellow">Mango</span> Global Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light">
              The The Mango Association of Kenya (T-MAK) coordinates, represents, and promotes the interests of all stakeholders in the mango value chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/members" className="bg-mangoyellow text-mangogreen px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center group">
                Explore Directory <Icons.ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center">
                Our Mandate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Role Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                Strategic Functions of T-MAK
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                As the peak industry body, T-MAK works in collaboration with the Government of Kenya and international partners to ensure the sustainability, profitability, and global competitiveness of the mango sector.
              </p>
              <ul className="space-y-4">
                {orgRole?.strategic_functions?.map((item: any, i: number) => (
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
                Value chain nodes not defined in the backend.
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
                <Link href="/login" className={`w-full block py-3 rounded font-bold transition ${i === 1 ? 'bg-tmak-accent text-tmak-green' : 'border border-white/30 hover:bg-white hover:text-tmak-green'}`}>
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
              const logoUrl = partner.logo?.url
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
