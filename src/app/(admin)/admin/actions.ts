"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function checkAdmin() {
  const session: any = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "TM_ADMIN")) {
    throw new Error("Unauthorized");
  }
}

// Member Actions
export async function createMember(data: any) {
  await checkAdmin();
  await prisma.member.create({
    data: {
      organization_name: data.organization_name,
      slug: data.slug,
      categoryId: data.categoryId,
      county: data.county,
      contact_person: data.contact_person,
      phone: data.phone,
      email: data.email,
      website: data.website,
      description: data.description,
      verified_since: data.verified_since ? parseInt(data.verified_since) : null,
      year_joined: data.year_joined ? parseInt(data.year_joined) : null,
      membership_status: data.membership_status || "inactive",
    }
  });
  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function updateMember(id: string, data: any) {
  await checkAdmin();
  await prisma.member.update({
    where: { id },
    data: {
      organization_name: data.organization_name,
      slug: data.slug,
      categoryId: data.categoryId,
      county: data.county,
      contact_person: data.contact_person,
      phone: data.phone,
      email: data.email,
      website: data.website,
      description: data.description,
      verified_since: data.verified_since ? parseInt(data.verified_since) : null,
      year_joined: data.year_joined ? parseInt(data.year_joined) : null,
      membership_status: data.membership_status || "inactive",
    }
  });
  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  await checkAdmin();
  await prisma.member.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

// Statistic Actions
export async function createStatistic(data: any) {
  await checkAdmin();
  await prisma.statistic.create({
    data: {
      label: data.label,
      value: parseFloat(data.value),
      year: parseInt(data.year),
      category: data.category,
    }
  });
  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

export async function updateStatistic(id: string, data: any) {
  await checkAdmin();
  await prisma.statistic.update({
    where: { id },
    data: {
      label: data.label,
      value: parseFloat(data.value),
      year: parseInt(data.year),
      category: data.category,
    }
  });
  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

export async function deleteStatistic(id: string) {
  await checkAdmin();
  await prisma.statistic.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

// Partner Actions
export async function createPartner(data: any) {
  await checkAdmin();
  await prisma.partner.create({
    data: {
      name: data.name,
      website: data.website,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartner(id: string) {
  await checkAdmin();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/partners");
}
