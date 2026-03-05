import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
const router = Router();
router.get('/', async (req, res) => {
  const { category, county, search, page = '1', limit = '12' } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);
  const where: any = {};
  if (category && category !== 'all') where.category = { name: category };
  if (county && county !== 'all') where.county = county;
  if (search) where.organization_name = { contains: search as string, mode: 'insensitive' };
  try {
    const [members, total] = await Promise.all([
      prisma.member.findMany({ where, include: { category: true, logo: true }, skip, take, orderBy: { organization_name: 'asc' } }),
      prisma.member.count({ where }),
    ]);
    res.json({ members, total, totalPages: Math.ceil(total / take) });
  } catch (error) {
    console.error('Error in GET /members:', error);
    res.status(500).json({ message: 'Error', error: error instanceof Error ? error.message : String(error) });
  }
});
router.get('/categories', async (req, res) => {
  try {
    res.json(await prisma.memberCategory.findMany({ orderBy: { name: 'asc' } }));
  } catch (error) {
    console.error('Error in GET /categories:', error);
    res.status(500).json({ message: 'Error' });
  }
});
router.get('/counties', async (req, res) => {
  try {
    const c = await prisma.member.findMany({ select: { county: true }, distinct: ['county'] });
    res.json(c.map(x => x.county).sort());
  } catch (error) {
    console.error('Error in GET /counties:', error);
    res.status(500).json({ message: 'Error' });
  }
});
router.get('/:slug', async (req, res) => {
  try {
    const m = await prisma.member.findUnique({ where: { slug: req.params.slug }, include: { category: true, logo: true, certifications: true, export_markets: true } });
    if (!m) return res.status(404).json({ message: 'Not found' });
    res.json(m);
  } catch (error) {
    console.error('Error in GET /members/:slug:', error);
    res.status(500).json({ message: 'Error' });
  }
});
router.post('/', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  try {
    const d = req.body;
    res.status(201).json(await prisma.member.create({ data: { organization_name: d.organization_name, slug: d.slug, categoryId: d.categoryId, county: d.county, contact_person: d.contact_person, phone: d.phone, email: d.email, website: d.website, description: d.description, verified_since: d.verified_since ? parseInt(d.verified_since) : null, year_joined: d.year_joined ? parseInt(d.year_joined) : null, membership_status: d.membership_status || "inactive" } }));
  } catch (error) {
    console.error('Error in POST /members:', error);
    res.status(500).json({ message: 'Error' });
  }
});
router.put('/:id', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  try {
    const d = req.body;
    res.json(await prisma.member.update({ where: { id: req.params.id }, data: { organization_name: d.organization_name, slug: d.slug, categoryId: d.categoryId, county: d.county, contact_person: d.contact_person, phone: d.phone, email: d.email, website: d.website, description: d.description, verified_since: d.verified_since ? parseInt(d.verified_since) : null, year_joined: d.year_joined ? parseInt(d.year_joined) : null, membership_status: d.membership_status || "inactive" } }));
  } catch (error) {
    console.error('Error in PUT /members/:id:', error);
    res.status(500).json({ message: 'Error' });
  }
});
router.delete('/:id', authenticateToken, authorizeRoles('SUPER_ADMIN', 'TM_ADMIN'), async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error in DELETE /members/:id:', error);
    res.status(500).json({ message: 'Error' });
  }
});
export default router;
