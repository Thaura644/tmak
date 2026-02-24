import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const members = await prisma.member.findMany({
    where: { membershipStatus: 'ACTIVE' }
  })

  const memberUrls = members.map((member) => ({
    url: `https://tmak.co.ke/members/${member.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: 'https://tmak.co.ke', lastModified: new Date() },
    { url: 'https://tmak.co.ke/about', lastModified: new Date() },
    { url: 'https://tmak.co.ke/members', lastModified: new Date() },
    ...memberUrls,
  ]
}
