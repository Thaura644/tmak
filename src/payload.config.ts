import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { ProduceGallery } from './collections/ProduceGallery'
import { OrganizationRole } from './collections/OrganizationRole'
import { ValueChainPlatform } from './collections/ValueChainPlatform'
import { MemberCategories } from './collections/MemberCategories'
import { Members } from './collections/Members'
import { Statistics } from './collections/Statistics'
import { Partners } from './collections/Partners'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Super Admin', value: 'super_admin' },
            { label: 'T-MAK Admin', value: 'tmak_admin' },
            { label: 'Member', value: 'member' },
          ],
          defaultValue: 'member',
          required: true,
        },
      ],
    },
    Media,
    ProduceGallery,
    OrganizationRole,
    ValueChainPlatform,
    MemberCategories,
    Members,
    Statistics,
    Partners,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '35c6b907c134812a870d1e03',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL || '',
    },
  }),
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'production' && process.env.PAYLOAD_SEED !== 'true') return

    try {
      const categories = [
        'Producer',
        'Trader',
        'Consumer',
        'Researcher',
        'Exporter',
        'Processor',
        'Input Supplier',
        'Logistics Provider',
        'Financial Service Provider',
      ]

      for (const category of categories) {
        const existing = await payload.find({
          collection: 'member_categories',
          where: { name: { equals: category } },
        })

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'member_categories',
            data: { name: category },
          })
        }
      }
    } catch (e) {
      console.error('Seed failed during onInit, this is expected if DB is not initialized yet:', e)
    }
  },
})
