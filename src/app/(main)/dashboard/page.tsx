import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import * as Icons from "lucide-react";

export default async function MemberDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  let member = null;
  try {
    member = await api.getMyProfile((session.user as any).backendToken);
  } catch (error) {
    console.error("Dashboard data fetch failed:", error);
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <Icons.AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-slate-600 mb-6">We couldn&apos;t find an associated member profile for your account.</p>
          <Link href="/" className="bg-tmak-green text-white px-6 py-2 rounded font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  member.membership_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {member.membership_status}
                </span>
                <span className="text-slate-400 text-xs">Member ID: {member.id.substring(0, 8)}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{member.organization_name}</h1>
              <p className="text-slate-500 flex items-center gap-1 mt-1">
                <Icons.MapPin className="w-4 h-4" /> {member.county} County, Kenya
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/members/${member.slug}`} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition">
                View Public Profile
              </Link>
              <button className="bg-tmak-green text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Icons.Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Joined</p>
                <p className="text-xl font-bold text-slate-800">{member.year_joined || '2023'}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Icons.Award className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Certifications</p>
                <p className="text-xl font-bold text-slate-800">{member.certifications?.length || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Icons.Globe className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Export Markets</p>
                <p className="text-xl font-bold text-slate-800">{member.export_markets?.length || 0}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Industry Alerts</h3>
                <Link href="/resources" className="text-tmak-green text-sm font-semibold hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { title: "Makueni Harvest Season Guidelines 2024", date: "2 days ago", type: "Standard" },
                  { title: "New Export Requirements for EU Markets", date: "1 week ago", type: "Regulation" },
                  { title: "Upcoming T-MAK Annual General Meeting", date: "2 weeks ago", type: "Event" },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-tmak-green"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Quick Links */}
          <div className="space-y-6">
            <div className="bg-tmak-green text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Member Support</h3>
                <p className="text-white/80 text-sm mb-6">Need help with certifications or market linkages? Our technical team is here for you.</p>
                <button className="w-full bg-white text-tmak-green py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition">
                  Contact Support
                </button>
              </div>
              <Icons.ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {[
                  { label: "Market Price Tracker", icon: Icons.TrendingUp, href: "/statistics" },
                  { label: "GAP Standard Docs", icon: Icons.FileText, href: "/resources" },
                  { label: "Member Directory", icon: Icons.Users, href: "/members" },
                  { label: "Submit Production Data", icon: Icons.BarChart, href: "#" },
                ].map((link, i) => (
                  <Link key={i} href={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-tmak-green transition text-sm font-medium border border-transparent hover:border-slate-100">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
