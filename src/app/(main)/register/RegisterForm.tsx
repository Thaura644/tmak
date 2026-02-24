'use client'

import React, { useActionState } from 'react'
import { registerMember } from './actions'

interface Category {
  id: string
  name: string
}

export default function RegisterForm({ categories }: { categories: Category[] }) {
  const [state, action, isPending] = useActionState(registerMember, null)

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="••••••••"
        />
      </div>

      <div className="pt-4 border-t border-slate-100">
        <label className="block text-sm font-bold text-slate-700 mb-1">Organization Name</label>
        <input
          type="text"
          name="organizationName"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="e.g. Sunny Farms Ltd"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
        <select
          name="category"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">County</label>
        <input
          type="text"
          name="county"
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="e.g. Makueni"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-tmak-green text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 mt-4"
      >
        {isPending ? 'Registering...' : 'Complete Registration'}
      </button>
    </form>
  )
}
