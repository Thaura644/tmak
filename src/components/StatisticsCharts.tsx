/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export function StatisticsCharts({ data }: { data: any[] }) {
  const productionData = data.filter(d => d.category === 'production');
  const exportData = data.filter(d => d.category === 'export');

  const COLORS = ['#2D5A27', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];

  return (
    <div className="space-y-12">
      <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-serif font-bold text-mangogreen mb-8">Production by County (Metric Tons)</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                {productionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-serif font-bold text-mangogreen mb-8">Export Destination Share</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exportData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="label"
                  label
                >
                  {exportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-mangogreen p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-serif font-bold mb-6">Market Insight Summary</h2>
          <div className="space-y-6">
            <div className="p-4 bg-white/10 rounded-xl border border-white/10">
              <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">Total National Yield</p>
              <p className="text-3xl font-bold">
                {productionData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} MT
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl border border-white/10">
              <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">Year-on-Year Growth</p>
              <p className="text-3xl font-bold">+12.4%</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl border border-white/10">
              <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">Primary Variety</p>
              <p className="text-3xl font-bold">Apple Mango</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
