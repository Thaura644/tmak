import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const tmakAdminPassword = await bcrypt.hash('tmak456', 10);
  
  // Create Admin Users
  await prisma.user.upsert({
    where: { username: 'superadmin' },
    update: { password: adminPassword, role: 'SUPER_ADMIN' },
    create: {
      username: 'superadmin',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { username: 'tmak_admin' },
    update: { password: tmakAdminPassword, role: 'TM_ADMIN' },
    create: {
      username: 'tmak_admin',
      password: tmakAdminPassword,
      role: 'TM_ADMIN',
    },
  });

  // Create Member Categories
  const categories = [
    'Producer',
    'Trader',
    'Consumer',
    'Researcher',
    'Exporter',
    'Processor',
    'Input Supplier',
    'Logistics Provider',
    'Financial Service Provider',
  ];

  for (const name of categories) {
    await prisma.memberCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Get some category IDs for sample members
  const producerCat = await prisma.memberCategory.findUnique({ where: { name: 'Producer' } });
  const traderCat = await prisma.memberCategory.findUnique({ where: { name: 'Trader' } });
  const researcherCat = await prisma.memberCategory.findUnique({ where: { name: 'Researcher' } });

  // Clear existing members to avoid unique constraint errors during seed
  await prisma.memberCertification.deleteMany();
  await prisma.memberExportMarket.deleteMany();
  await prisma.member.deleteMany();

  if (producerCat && traderCat && researcherCat) {
    await prisma.member.create({
      data: {
        organization_name: 'Mary Wakio Farms',
        slug: 'mary-wakio-farms',
        categoryId: producerCat.id,
        county: 'Embu',
        contact_person: 'Mary Wakio',
        membership_status: 'active',
        verified_since: 2021,
        year_joined: 2020,
      }
    });

    await prisma.member.create({
      data: {
        organization_name: 'Samuel Exports Ltd',
        slug: 'samuel-exports-ltd',
        categoryId: traderCat.id,
        county: 'Mombasa',
        contact_person: 'Samuel Otieno',
        membership_status: 'active',
        verified_since: 2019,
        year_joined: 2018,
      }
    });

    await prisma.member.create({
      data: {
        organization_name: 'Kenya Agri Research',
        slug: 'kenya-agri-research',
        categoryId: researcherCat.id,
        county: 'Nairobi',
        contact_person: 'Dr. Jane Kariuki',
        membership_status: 'active',
        verified_since: 2022,
        year_joined: 2022,
      }
    });
  }

  // Create some statistics
  await prisma.statistic.deleteMany();
  await prisma.statistic.createMany({
    data: [
      { label: 'Makueni', value: 185000, year: 2023, category: 'production' },
      { label: 'Machakos', value: 142000, year: 2023, category: 'production' },
      { label: 'Kilifi', value: 98000, year: 2023, category: 'production' },
      { label: 'Kwalu', value: 76000, year: 2023, category: 'production' },
      { label: 'Meru', value: 64000, year: 2023, category: 'production' },
    ]
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
