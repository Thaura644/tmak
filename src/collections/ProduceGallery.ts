import type { CollectionConfig } from 'payload'
export const ProduceGallery: CollectionConfig = {
  slug: 'produce_gallery',
  access: { read: () => true },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'alt_text', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'display_order', type: 'number' },
  ],
}
