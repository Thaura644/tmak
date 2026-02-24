'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as Icons from 'lucide-react'

export function MembersFilter({ categories }: { categories: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category') || ''
  const selectedCounty = searchParams.get('county') || 'All Counties'
  const searchQuery = searchParams.get('search') || ''

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'All Counties') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    router.push(`/members?${params.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Search</label>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Organization name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mangogreen outline-none transition"
            defaultValue={searchQuery}
            onKeyDown={(e) => e.key === 'Enter' && updateFilters('search', (e.target as HTMLInputElement).value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Industry Category</label>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!selectedCategory ? 'bg-mangogreen text-white font-bold' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters('category', cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === cat.id ? 'bg-mangogreen text-white font-bold' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
