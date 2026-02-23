import type { CollectionConfig } from 'payload'
export const Statistics: CollectionConfig = {
  slug: 'statistics',
  access: { read: () => true },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'number', required: true },
    { name: 'year', type: 'number', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Production', value: 'production' },
        { label: 'Export', value: 'export' },
        { label: 'Membership', value: 'membership' },
      ],
    },
  ],
}
