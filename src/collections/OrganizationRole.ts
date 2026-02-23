import type { CollectionConfig } from 'payload'
export const OrganizationRole: CollectionConfig = {
  slug: 'organization_role',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'richText' },
    { name: 'strategic_functions', type: 'array', fields: [{ name: 'function', type: 'text' }] },
    { name: 'banner_image', type: 'upload', relationTo: 'media' },
    {
      name: 'call_to_action_button',
      type: 'group',
      fields: [{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }],
    },
  ],
}
