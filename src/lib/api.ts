const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  async getMembers(filters: any = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${BACKEND_URL}/api/members?${params.toString()}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch members");
    return res.json();
  },
  async getMemberBySlug(slug: string) {
    const res = await fetch(`${BACKEND_URL}/api/members/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch member");
    return res.json();
  },
  async getCategories() {
    const res = await fetch(`${BACKEND_URL}/api/members/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
  async getCounties() {
    const res = await fetch(`${BACKEND_URL}/api/members/counties`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch counties");
    return res.json();
  },
  async getStatistics(year?: number) {
    const url = year ? `${BACKEND_URL}/api/statistics?year=${year}` : `${BACKEND_URL}/api/statistics`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch statistics");
    return res.json();
  },
  async getAvailableYears() {
    const res = await fetch(`${BACKEND_URL}/api/statistics/years`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch years");
    return res.json();
  },
  async getPartners() {
    const res = await fetch(`${BACKEND_URL}/api/partners`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch partners");
    return res.json();
  },
  async getOrgRole() {
    const res = await fetch(`${BACKEND_URL}/api/content/org-role`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch org role");
    return res.json();
  },
  async getValueChain() {
    const res = await fetch(`${BACKEND_URL}/api/content/value-chain`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch value chain");
    return res.json();
  },
  async getProduceGallery() {
    const res = await fetch(`${BACKEND_URL}/api/content/produce-gallery`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch produce gallery");
    return res.json();
  },
};
