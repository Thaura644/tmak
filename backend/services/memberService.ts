import { prisma } from '@/lib/prisma';

export const memberService = {
  async getAllMembers(filters: any = {}) {
    const { category, county, search, page = 1, limit = 12 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && category !== 'all') {
      where.category = { name: category };
    }
    if (county && county !== 'all') {
      where.county = county;
    }
    if (search) {
      where.organization_name = { contains: search, mode: 'insensitive' };
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        include: { category: true, logo: true },
        skip,
        take: limit,
        orderBy: { organization_name: 'asc' },
      }),
      prisma.member.count({ where }),
    ]);

    return {
      members,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getMemberBySlug(slug: string) {
    return prisma.member.findUnique({
      where: { slug },
      include: {
        category: true,
        logo: true,
        certifications: true,
        export_markets: true,
      },
    });
  },

  async getCategories() {
    return prisma.memberCategory.findMany({
      orderBy: { name: 'asc' },
    });
  },

  async getCounties() {
    const counties = await prisma.member.findMany({
      select: { county: true },
      distinct: ['county'],
    });
    return counties.map(c => c.county).sort();
  },
};
