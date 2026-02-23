import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Member } from '@/types/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = [
    {
      url: 'https://tmak.co.ke',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://tmak.co.ke/members',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://tmak.co.ke/statistics',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  try {
    const payload = await getPayload({ config })

    const { docs: members } = await payload.find({
      collection: 'members',
      where: {
        membership_status: {
          equals: 'active',
        },
      },
      limit: 1000,
    })

    const memberUrls = (members as unknown as Member[]).map((member) => ({
      url: `https://tmak.co.ke/members/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticUrls, ...memberUrls]
  } catch (e) {
    console.error('Sitemap generation failed (likely DB not ready), returning static URLs:', e)
    return staticUrls
  }
}
