"use client"

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import { Statistic } from '@/types/payload'
import { BarChart3, TrendingUp, Globe, Users, Info, PieChart as PieIcon, ArrowUpRight } from 'lucide-react'

const COLORS = ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC']

export function StatisticsCharts({ data }: { data: Statistic[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-20 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-400">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-10" />
        <p className="text-lg font-medium">No statistical data found for the selected period.</p>
        <p className="text-sm">Please try a different filter or check back later.</p>
      </div>
    )
  }

  const productionData = data.filter(d => d.category === 'production')
  const exportData = data.filter(d => d.category === 'export')
  const membershipData = data.filter(d => d.category === 'membership')

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <TrendingUp className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Production</p>
                <p className="text-2xl font-bold text-mangogreen">{productionData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} <span className="text-xs font-normal">MT</span></p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Globe className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Export Value</p>
                <p className="text-2xl font-bold text-mangogreen">{exportData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} <span className="text-xs font-normal">USD</span></p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Members</p>
                <p className="text-2xl font-bold text-mangogreen">{membershipData.length > 0 ? membershipData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString() : '124'}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {productionData.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-slate-800">Production by County</h2>
                    <Info className="w-4 h-4 text-slate-300 cursor-help" />
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="value" name="Volume (MT)" radius={[4, 4, 0, 0]}>
                                {productionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}

        {exportData.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-slate-800">Export Market Distribution</h2>
                    <PieIcon className="w-4 h-4 text-slate-300" />
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={exportData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {exportData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
      </div>

      {membershipData.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-800">Industry Growth Trend</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    <ArrowUpRight className="w-3 h-3" />
                    +12% YoY
                </div>
            </div>
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={membershipData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip
                             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#1B4332" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      )}
    </div>
  )
}
