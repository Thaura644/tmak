"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function checkAuth() {
  const session = await getServerSession(authOptions as any);
  if (!session || ((session as any).user as any).role !== 'ADMIN') {
    throw new Error("Unauthorized");
  }
}

// Member Actions
export async function createMember(data: any) {
  await checkAuth();
  await prisma.member.create({
    data
  });
  revalidatePath("/");
  revalidatePath("/admin/members");
}

export async function updateMember(id: string, data: any) {
  await checkAuth();
  await prisma.member.update({
    where: { id },
    data
  });
  revalidatePath("/");
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  await checkAuth();
  await prisma.member.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/members");
}

// Advert Actions
export async function createAdvert(data: any) {
  await checkAuth();
  await prisma.advert.create({
    data
  });
  revalidatePath("/");
  revalidatePath("/admin/adverts");
}

export async function updateAdvert(id: string, data: any) {
  await checkAuth();
  await prisma.advert.update({
    where: { id },
    data
  });
  revalidatePath("/");
  revalidatePath("/admin/adverts");
}

export async function deleteAdvert(id: string) {
  await checkAuth();
  await prisma.advert.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/adverts");
}
