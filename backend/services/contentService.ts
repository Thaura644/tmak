import { prisma } from '@/lib/prisma';

export const contentService = {
  async getOrganizationRole() {
    return prisma.organizationRole.findFirst({
      include: {
        banner_image: true,
        strategic_functions: true,
      },
    });
  },

  async getValueChainPlatform() {
    return prisma.valueChainPlatform.findFirst({
      include: {
        value_chain_map_image: true,
        nodes: true,
        production_data: true,
      },
    });
  },

  async getProduceGallery() {
    return prisma.produceGallery.findMany({
      include: { image: true },
      orderBy: { display_order: 'asc' },
    });
  },
};
