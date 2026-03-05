"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function MemberDashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-spin w-8 h-8 text-mangogreen">
          <Icons.Loader2 className="w-full h-full" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "My Orchards", value: "24.5 Ha", icon: Icons.TreeDeciduous, color: "text-green-600 bg-green-50" },
    { label: "Certification", value: "GAP Verified", icon: Icons.Award, color: "text-mangoyellow-accent bg-mangoyellow/20" },
    { label: "Market Access", value: "EU, UAE", icon: Icons.Globe, color: "text-blue-600 bg-blue-50" },
    { label: "Next Audit", value: "12 Days", icon: Icons.Calendar, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Member Dashboard</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              Welcome back, <span className="text-mangogreen font-bold">{session?.user?.name || "Member"}</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              Member ID: T-MAK-{(session?.user as any)?.id?.substring(0, 6).toUpperCase() || "NEW"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
            >
              <Icons.LogOut className="w-5 h-5" />
              Sign Out
            </button>
            <button className="px-6 py-3 bg-mangogreen text-white rounded-xl font-bold hover:bg-mangogreen/90 transition shadow-lg flex items-center gap-2">
              <Icons.Plus className="w-5 h-5" />
              New Log
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Icons.TrendingUp className="w-6 h-6 text-mangogreen" />
                Recent Harvest History
              </h2>
              <div className="space-y-4">
                {[
                  { date: "Oct 24, 2023", county: "Makueni", volume: "1,200 KG", status: "Processed" },
                  { date: "Oct 12, 2023", county: "Machakos", volume: "850 KG", status: "In Transit" },
                  { date: "Sep 28, 2023", county: "Makueni", volume: "2,100 KG", status: "Delivered" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-mangogreen/20 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:text-mangogreen transition">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{row.date}</p>
                        <p className="text-xs text-slate-400 font-medium">{row.county} Collection Point</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-mangogreen">{row.volume}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${row.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-mangoyellow/20 text-mangogreen'}`}>
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-mangogreen p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <Icons.Zap className="w-12 h-12 text-mangoyellow mb-6" />
              <h3 className="text-xl font-bold mb-2">Member Resources</h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">Access exclusive GAP standards, export guides, and buyer contact lists.</p>
              <Link href="/resources" className="w-full block py-4 bg-white text-mangogreen rounded-xl font-bold text-center hover:bg-slate-50 transition">
                Browse Library
              </Link>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Icons.Bell className="w-5 h-5 text-mangoyellow" />
                Latest Announcements
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Makueni Collection Schedule", time: "2h ago" },
                  { title: "EU Pesticide Regulation Update", time: "1d ago" },
                  { title: "Member Subscription Renewal", time: "3d ago" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 h-8 bg-slate-100 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-slate-700 hover:text-mangogreen cursor-pointer transition">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
