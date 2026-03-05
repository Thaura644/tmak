import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
const router = Router();
router.get('/', async (req, res) => {
  const { year } = req.query;
  const where: any = year ? { year: parseInt(year as string) } : {};
  res.json(await prisma.statistic.findMany({ where, orderBy: { value: 'desc' } }));
});
router.get('/years', async (req, res) => {
  const s = await prisma.statistic.findMany({ select: { year: true }, distinct: ['year'], orderBy: { year: 'desc' } });
  res.json(s.map(x => x.year));
});
router.post('/', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  const d = req.body;
  res.status(201).json(await prisma.statistic.create({ data: { label: d.label, value: parseFloat(d.value), year: parseInt(d.year), category: d.category } }));
});
router.put('/:id', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  const d = req.body;
  res.json(await prisma.statistic.update({ where: { id: req.params.id }, data: { label: d.label, value: parseFloat(d.value), year: parseInt(d.year), category: d.category } }));
});
router.delete('/:id', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  await prisma.statistic.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
export default router;
