export interface Media {
  id: string;
  url: string;
  alt?: string;
}
export interface MemberCategory {
  id: string;
  name: string;
}
export interface Member {
  id: string;
  organization_name: string;
  slug: string;
  category: string | MemberCategory;
  county: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  logo?: string | Media;
  membership_status: 'active' | 'inactive';
  verified_since?: number;
  certifications?: { name: string }[];
  export_markets?: { market: string }[];
  year_joined?: number;
  user: string;
}
export interface Statistic {
  id: string;
  label: string;
  value: number;
  year: number;
  category: 'production' | 'export' | 'membership';
}
export interface GalleryItem {
  id: string;
  image: string | Media;
  alt_text: string;
  caption?: string;
  display_order?: number;
}
