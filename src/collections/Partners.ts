import type { CollectionConfig } from 'payload'
export const Partners: CollectionConfig = {
  slug: 'partners',
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
  ],
}
