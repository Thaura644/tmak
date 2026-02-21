import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  const members = [
    {
      name: 'Mary Wakio',
      role: 'Small-holder Farmer',
      location: 'Embu',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe33dFPETeYlU8H0bLSyKriQ3wD5ZzE55rlcGsG4GVEefQlrCFzy_ZrsvSVPuttGkTPWgOU2xMNtn1VIieog4rxsBSlxp6vgVTPgTdfaUkwoAWEKEUVOKIsWE8AfnOoCXsU0X86syDVNP8us5k_xY_PlhCTku8CZviaYUY6YjeTMV9m8Fu8OolprdUiukxntH3QrWo31tIBjomPoz2TiV8_Oos-feQYbssHNJ2iNQy1puJf4hY5IHo0slwfVRACvC7-QJb19egMuuo',
      category: 'Producer',
    },
    {
      name: 'Samuel Otieno',
      role: 'Exporter',
      location: 'Mombasa',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDToVUwrsgd3udAN_QKs0rKtMUofXHxVOa8IEQ8Drj6g83ceryMGFb-HhQ2Giyc2VMF6xMUsAnmVbUQT7KhSfbC7BRSiapnyqWiLNodZR2KQbidGcRqbqEQZbEKj3KcGK12Uci4ZDsElzeBE1SIsgHO5fqx85868YSPUPAnFwl1oGfZfpz3QKo2QtGL476xmkdlGUG5wZ6lyfQCp_fdsHLoMb3_cDead6DTdTSDTc6CDuRe5Om6n8hxRjWEHDNLIS9uLZmqG2tKcpgo',
      category: 'Trader',
    },
    {
      name: 'Dr. Jane Kariuki',
      role: 'Agricultural Researcher',
      location: 'Nairobi',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCotXU0QdnDN2XMDUgBpzIs60x9D4eAS1lNhsann-6fgGUbuWstNqcGCJXUP4E3PY0ZQxs_O1E5NkzMwC8udZgNvbBbYYK7U3yD0mmEIzwzddeMdNMCcnrTuCrcTDEh1li5B7LQ1tTvVM09-8JXidDKomWl9Wmt1X6jKlCnqMxwBefTrAGIEVQ05nrNq7CQSwD94HpWEay6vd-ZHhQq5GTNltdCAlbqffc6i2NAm1AOsGO8J99gqUbZ4PLP7KcxhRpYqrPnMNsEcOam',
      category: 'Researcher',
    },
  ];

  for (const member of members) {
    await prisma.member.create({
      data: member,
    });
  }

  const adverts = [
    {
      title: 'Fresh Harvest Fertilizer',
      description: 'Boost your yield by 40% with our organic, mango-optimized soil nutrients.',
      type: 'SPONSORED',
      link: '#',
      memberDiscount: 'Claim Member Discount',
    },
    {
      title: 'T-MAK Exports',
      description: 'Premium cold-chain solutions for international shipping.',
      type: 'LOGISTICS',
      link: '#',
    },
    {
      title: 'Digital Agronomist Pro',
      description: 'Smart weather and pest tracking in the palm of your hand.',
      type: 'TECH',
      link: '#',
    },
  ];

  for (const advert of adverts) {
    await prisma.advert.create({
      data: advert,
    });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
