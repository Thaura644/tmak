import type { CollectionConfig } from 'payload'
export const Members: CollectionConfig = {
  slug: 'members',
  admin: { useAsTitle: 'organization_name' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super_admin' || user.role === 'tmak_admin') return true
      return { user: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'super_admin' || user?.role === 'tmak_admin',
  },
  fields: [
    { name: 'organization_name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'category', type: 'relationship', relationTo: 'member_categories', required: true },
    { name: 'county', type: 'text', required: true },
    { name: 'contact_person', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'website', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'membership_status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'inactive',
      access: {
        update: ({ req: { user } }) => user?.role === 'super_admin' || user?.role === 'tmak_admin',
      },
    },
    { name: 'verified_since', type: 'number', label: 'Verified Member Since (Year)' },
    { name: 'certifications', type: 'array', fields: [{ name: 'name', type: 'text' }] },
    { name: 'export_markets', type: 'array', fields: [{ name: 'market', type: 'text' }] },
    { name: 'year_joined', type: 'number' },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
  ],
}
