export const dynamic = "force-dynamic"
import React from 'react'
import { getMemberCategories } from '@/lib/data'
import RegisterForm from './RegisterForm'

export default async function RegisterPage() {
  const categories = await getMemberCategories()

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-bold text-tmak-green mb-2">Become a Member</h1>
        <RegisterForm categories={categories.map(c => ({ id: c.id, name: c.name }))} />
      </div>
    </div>
  )
}
