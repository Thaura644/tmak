"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MemberCategory } from '@/types/payload'
import * as Icons from 'lucide-react'

export function MembersFilter({ categories }: { categories: MemberCategory[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string, checked?: boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    if (key === 'category') {
      const current = params.getAll('category')
      if (checked) {
        if (!current.includes(value)) params.append('category', value)
      } else {
        params.delete('category')
        current.filter(c => c !== value).forEach(c => params.append('category', c))
      }
    } else {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }

    params.delete('page')
    router.push(`/members?${params.toString()}`)
  }

  const resetFilters = () => {
    router.push('/members')
  }

  const selectedCategories = searchParams.getAll('category')

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-bold text-mangogreen mb-6 flex items-center">
        <Icons.Filter className="w-5 h-5 mr-2" />
        Directory Filters
      </h3>
      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Search Members</label>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="Organization name..."
              className="w-full pl-10 pr-4 py-2 rounded-md border-slate-200 focus:ring-mangogreen focus:border-mangogreen text-sm"
              defaultValue={searchParams.get('search') || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Member Category</label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center text-sm text-slate-600 cursor-pointer group hover:text-mangogreen transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-mangogreen focus:ring-mangogreen mr-3 w-4 h-4 border-slate-300 transition-all"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={(e) => handleFilterChange('category', cat.id, e.target.checked)}
                />
                <span className="flex-1">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* County Selection */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">County</label>
          <select
            className="w-full rounded-md border-slate-200 focus:ring-mangogreen focus:border-mangogreen text-sm bg-slate-50 border-0 py-2.5"
            value={searchParams.get('county') || 'All Counties'}
            onChange={(e) => handleFilterChange('county', e.target.value)}
          >
            <option>All Counties</option>
            {['Makueni', 'Machakos', 'Kilifi', 'Kwale', 'Meru', 'Embu', 'Taita Taveta', 'Nairobi'].map(c => (
                <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="pt-4 space-y-3">
            <button
                onClick={resetFilters}
                className="w-full text-slate-400 text-xs font-semibold hover:text-red-500 transition-colors flex items-center justify-center gap-2"
            >
                <Icons.RotateCcw className="w-3 h-3" />
                Reset All Filters
            </button>
        </div>
      </div>
    </div>
  )
}
