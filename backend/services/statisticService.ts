import { prisma } from '@/lib/prisma';

export const statisticService = {
  async getStatistics(year?: number) {
    const where: any = {};
    if (year) {
      where.year = year;
    }
    return prisma.statistic.findMany({
      where,
      orderBy: { value: 'desc' },
    });
  },

  async getAvailableYears() {
    const stats = await prisma.statistic.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    });
    return stats.map(s => s.year);
  },
};
