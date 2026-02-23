import type { CollectionConfig } from 'payload'
export const MemberCategories: CollectionConfig = {
  slug: 'member_categories',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}
