export const dynamic = "force-dynamic"
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RegisterForm from './RegisterForm'

export default async function RegisterPage() {
  const payload = await getPayload({ config })
  const { docs: categories } = await payload.find({
    collection: 'member_categories',
    sort: 'name',
    limit: 100,
  })

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-bold text-tmak-green mb-2">Become a Member</h1>
        <p className="text-slate-500 mb-8">Join the Mango Association of Kenya ecosystem today.</p>

        <RegisterForm categories={categories.map(c => ({ id: c.id.toString(), name: c.name as string }))} />

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <a href="/login" className="text-tmak-green font-bold hover:underline">Log in</a>
        </p>
      </div>
    </div>
  )
}
