import { Router } from 'express';
import { prisma } from '../lib/prisma';
const router = Router();
router.get('/org-role', async (req, res) => {
  res.json(await prisma.organizationRole.findFirst({ include: { banner_image: true, strategic_functions: true } }));
});
router.get('/value-chain', async (req, res) => {
  res.json(await prisma.valueChainPlatform.findFirst({ include: { value_chain_map_image: true, nodes: true, production_data: true } }));
});
router.get('/produce-gallery', async (req, res) => {
  res.json(await prisma.produceGallery.findMany({ include: { image: true }, orderBy: { display_order: 'asc' } }));
});
export default router;
