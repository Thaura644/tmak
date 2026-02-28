import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
const router = Router();
router.get('/', async (req, res) => {
  res.json(await prisma.partner.findMany({ include: { logo: true }, orderBy: { name: 'asc' } }));
});
router.post('/', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  res.status(201).json(await prisma.partner.create({ data: { name: req.body.name, website: req.body.website } }));
});
router.delete('/:id', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  await prisma.partner.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
export default router;
