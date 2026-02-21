import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white p-6">
        <h2 className="text-2xl font-serif font-bold mb-8 text-mango">The Mango Association of Lenya CMS</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-mango transition-colors">Dashboard</Link>
          <Link href="/admin/members" className="block hover:text-mango transition-colors">Members</Link>
          <Link href="/admin/adverts" className="block hover:text-mango transition-colors">Adverts</Link>
          <Link href="/" className="block pt-8 text-gray-400 hover:text-white transition-colors">View Website</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
