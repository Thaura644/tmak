"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getAuthHeader() {
  const session: any = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "TM_ADMIN")) {
    throw new Error("Unauthorized");
  }
  return {
    "Authorization": `Bearer ${session.user.accessToken}`,
    "Content-Type": "application/json"
  };
}

// Member Actions
export async function createMember(data: any) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/members`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create member");

  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function updateMember(id: string, data: any) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/members/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update member");

  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/members/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete member");

  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/admin/members");
}

// Statistic Actions
export async function createStatistic(data: any) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/statistics`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create statistic");

  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

export async function updateStatistic(id: string, data: any) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/statistics/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update statistic");

  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

export async function deleteStatistic(id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/statistics/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete statistic");

  revalidatePath("/");
  revalidatePath("/statistics");
  revalidatePath("/admin/statistics");
}

// Partner Actions
export async function createPartner(data: any) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/partners`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create partner");

  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartner(id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(`${BACKEND_URL}/api/partners/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete partner");

  revalidatePath("/");
  revalidatePath("/admin/partners");
}
