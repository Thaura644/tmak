export const dynamic = "force-dynamic"
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any).role !== 'member') {
    redirect('/login')
  }

  const payload = await getPayload({ config })

  // Fetch member profile
  const { docs: members } = await payload.find({
    collection: 'members',
    where: {
      user: { equals: (session.user as any).id }
    }
  })

  const member = members[0] as any

  // Fetch recent adverts as "updates"
  const { docs: updates } = await payload.find({
    collection: 'partners', // Or some other collection for updates
    limit: 3,
  })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Member Dashboard</h1>
            <p className="text-slate-500">Welcome back, {member?.organization_name || session.user?.email}</p>
          </div>
          <div className="flex gap-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${member?.membership_status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              Status: {member?.membership_status === 'active' ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Updates Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icons.Bell className="w-5 h-5 text-tmak-green" /> Latest Updates
              </h2>
              <div className="space-y-6">
                {updates.map((update: any, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icons.Info className="w-6 h-6 text-tmak-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{update.name}</h3>
                      <p className="text-sm text-slate-500">New partnership announcement and industry update for all members.</p>
                    </div>
                  </div>
                ))}
                {updates.length === 0 && (
                  <p className="text-slate-400 italic">No new updates at this time.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-tmak-green transition group">
                <Icons.FileText className="w-8 h-8 text-tmak-green mb-4" />
                <h3 className="font-bold mb-2">Resource Library</h3>
                <p className="text-sm text-slate-500 mb-4">Download training manuals and policy documents.</p>
                <Link href="/resources" className="text-tmak-green text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Resources <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-tmak-green transition group">
                <Icons.TrendingUp className="w-8 h-8 text-tmak-green mb-4" />
                <h3 className="font-bold mb-2">Market Data</h3>
                <p className="text-sm text-slate-500 mb-4">View detailed production and price trends.</p>
                <Link href="/statistics" className="text-tmak-green text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Statistics <Icons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6">Your Profile</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organization</p>
                  <p className="font-bold text-slate-700">{member?.organization_name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">County</p>
                  <p className="font-bold text-slate-700">{member?.county}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Email</p>
                  <p className="font-bold text-slate-700">{session.user?.email}</p>
                </div>
                <button className="w-full mt-4 py-2 border-2 border-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
                  Edit Profile (Coming Soon)
                </button>
                <Link href="/api/auth/signout" className="w-full block text-center py-2 text-sm font-bold text-red-500 hover:text-red-600 transition">
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
