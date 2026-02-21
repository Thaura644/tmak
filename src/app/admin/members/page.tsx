import { prisma } from "@/lib/prisma";
import { MembersList } from "./MembersList";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Manage Members</h1>
      <MembersList initialMembers={members} />
    </div>
  );
}
