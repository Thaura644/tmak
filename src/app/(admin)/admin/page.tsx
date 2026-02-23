import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const memberCount = await prisma.member.count();
  const advertCount = await prisma.advert.count();

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Total Members</h2>
          <p className="text-4xl font-serif text-mango">{memberCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Active Adverts</h2>
          <p className="text-4xl font-serif text-leaf">{advertCount}</p>
        </div>
      </div>
    </div>
  );
}
