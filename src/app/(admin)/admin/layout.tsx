import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const isAdmin = session.user.role === "SUPER_ADMIN" || session.user.role === "TM_ADMIN";

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="mb-6">You do not have permission to access the admin dashboard.</p>
          <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-zinc-900 text-white p-6">
        <h2 className="text-2xl font-serif font-bold mb-8 text-mango">T-MAK Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-mango transition-colors">Dashboard</Link>
          <Link href="/admin/members" className="block hover:text-mango transition-colors">Members</Link>
          <Link href="/admin/statistics" className="block hover:text-mango transition-colors">Statistics</Link>
          <Link href="/admin/adverts" className="block hover:text-mango transition-colors text-gray-500">Adverts (Legacy)</Link>
          <Link href="/" className="block pt-8 text-gray-400 hover:text-white transition-colors">View Website</Link>
        </nav>
        <div className="mt-auto pt-10 text-xs text-gray-500">
          Logged in as: <span className="text-white">{session.user.name}</span>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
