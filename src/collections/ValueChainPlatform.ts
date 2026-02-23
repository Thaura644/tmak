import type { CollectionConfig } from 'payload'
export const ValueChainPlatform: CollectionConfig = {
  slug: 'value_chain_platform',
  access: { read: () => true },
  fields: [
    { name: 'overview_text', type: 'richText' },
    { name: 'value_chain_map_image', type: 'upload', relationTo: 'media' },
    {
      name: 'nodes',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'production_by_county_data',
      type: 'array',
      fields: [
        { name: 'county', type: 'text' },
        { name: 'production_volume', type: 'number' },
        { name: 'year', type: 'number' },
      ],
    },
    { name: 'export_markets_description', type: 'textarea' },
    { name: 'supporters_description', type: 'textarea' },
    { name: 'secondary_processors_description', type: 'textarea' },
  ],
}
