"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

// Member Actions
export async function createMember(data: { name: string, role: string, location: string, imageUrl: string, category: string }) {
  await checkAuth();
  const { name, role, location, imageUrl, category } = data;
  await prisma.member.create({
    data: { name, role, location, imageUrl, category }
  });
  revalidatePath("/");
  revalidatePath("/admin/members");
}

export async function updateMember(id: string, data: { name: string, role: string, location: string, imageUrl: string, category: string }) {
  await checkAuth();
  const { name, role, location, imageUrl, category } = data;
  await prisma.member.update({
    where: { id },
    data: { name, role, location, imageUrl, category }
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
export async function createAdvert(data: { title: string, description: string, type: string, link: string, memberDiscount?: string }) {
  await checkAuth();
  const { title, description, type, link, memberDiscount } = data;
  await prisma.advert.create({
    data: { title, description, type, link, memberDiscount }
  });
  revalidatePath("/");
  revalidatePath("/admin/adverts");
}

export async function updateAdvert(id: string, data: { title: string, description: string, type: string, link: string, memberDiscount?: string }) {
  await checkAuth();
  const { title, description, type, link, memberDiscount } = data;
  await prisma.advert.update({
    where: { id },
    data: { title, description, type, link, memberDiscount }
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
