export const dynamic = "force-dynamic"
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions as any)
  if (!session || ((session as any).user as any).role !== 'MEMBER') redirect('/login')

  const member = await prisma.member.findUnique({
    where: { userId: ((session as any).user as any).id },
    include: { category: true }
  })

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Member Dashboard</h1>
        <p className="text-slate-500 mb-8">Welcome back, {member?.organizationName || ((session as any).user as any)?.email}</p>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <p className="font-bold">Status: {member?.membershipStatus}</p>
        </div>
      </div>
    </div>
  )
}
