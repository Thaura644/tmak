/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";

export function MembersFilter({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [county, setCounty] = useState(searchParams.get("county") || "all");

  const counties = [
    "Makueni", "Machakos", "Kilifi", "Kwale", "Meru", "Embu", "Tharaka Nithi",
    "Kitui", "Murang'a", "Taita Taveta", "Garissa", "Bungoma", "Busia", "Siaya"
  ];

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (county !== "all") params.set("county", county);

    const query = params.toString();
    router.push(`/members${query ? `?${query}` : ""}`);
  }, [search, category, county, router]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Search Directory</h3>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Organization name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mangogreen/20 focus:border-mangogreen transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Industry Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCategory("all")}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${category === "all" ? "bg-mangogreen text-white font-bold" : "text-slate-600 hover:bg-slate-50"}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${category === cat.name ? "bg-mangogreen text-white font-bold" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Filter by County</h3>
        <select
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        >
          <option value="all">All Counties</option>
          {counties.sort().map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setSearch("");
          setCategory("all");
          setCounty("all");
        }}
        className="w-full py-2 text-xs font-bold text-slate-400 hover:text-mangogreen transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
}
