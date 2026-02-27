import { prisma } from "@/lib/prisma";
import { MembersList } from "./MembersList";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    include: { category: true },
    orderBy: { organization_name: 'asc' }
  });

  const categories = await prisma.memberCategory.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Manage Members</h1>
      <MembersList initialMembers={members} categories={categories} />
    </div>
  );
}
