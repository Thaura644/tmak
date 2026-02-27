import { prisma } from '@/lib/prisma';

export const partnerService = {
  async getAllPartners() {
    return prisma.partner.findMany({
      include: { logo: true },
      orderBy: { name: 'asc' },
    });
  },
};
