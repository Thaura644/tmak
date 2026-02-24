import { prisma } from './prisma'

export async function getOrganizationInfo() {
  return prisma.organizationInfo.findFirst()
}

export async function getStatistics(year = 2023) {
  return prisma.statistic.findMany({
    where: { year },
  })
}

export async function getMemberCategories() {
  return prisma.memberCategory.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function getPartners() {
  return prisma.partner.findMany()
}

export async function getProduceItems() {
  return prisma.produce.findMany({
    orderBy: { displayOrder: 'asc' },
  })
}

export async function getMembers(filters: {
  category?: string | string[]
  county?: string
  search?: string
  page?: number
  limit?: number
}) {
  const { category, county, search, page = 1, limit = 12 } = filters

  const where: any = {
    membershipStatus: 'ACTIVE'
  }

  if (category) {
    const categoryIds = Array.isArray(category) ? category : [category]
    if (categoryIds.length > 0) {
      where.categoryId = { in: categoryIds }
    }
  }

  if (county && county !== 'All Counties') {
    where.county = { contains: county }
  }

  if (search) {
    where.organizationName = { contains: search }
  }

  const [docs, totalDocs] = await Promise.all([
    prisma.member.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: { category: true },
      orderBy: { yearJoined: 'desc' },
    }),
    prisma.member.count({ where }),
  ])

  return {
    docs,
    totalDocs,
    totalPages: Math.ceil(totalDocs / limit),
    page,
  }
}

export async function getMemberBySlug(slug: string) {
  return prisma.member.findUnique({
    where: { slug },
    include: { category: true },
  })
}

export async function getResources() {
  return prisma.resource.findMany()
}
