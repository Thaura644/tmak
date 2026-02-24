import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.resource.deleteMany()
  await prisma.statistic.deleteMany()
  await prisma.produce.deleteMany()
  await prisma.partner.deleteMany()
  await prisma.member.deleteMany()
  await prisma.memberCategory.deleteMany()
  await prisma.organizationInfo.deleteMany()
  await prisma.user.deleteMany()

  const categories = await Promise.all([
    prisma.memberCategory.create({ data: { name: 'Producer' } }),
    prisma.memberCategory.create({ data: { name: 'Trader' } }),
    prisma.memberCategory.create({ data: { name: 'Exporter' } }),
    prisma.memberCategory.create({ data: { name: 'Processor' } }),
    prisma.memberCategory.create({ data: { name: 'Input Supplier' } }),
  ])

  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tmak.co.ke',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  await prisma.organizationInfo.create({
    data: {
      title: 'The Mango Association of Kenya (T-MAK)',
      description: 'National coordinating authority, value chain platform, and market linkage enabler for Kenya\'s mango industry.',
      bannerImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCINAOCgbzbCG5B1PyrJLQcbYwzAXw90_4mQoy8J1LwFeDc1jBfRDL8pXIZvAvao8kVmTaKe23ohQi5rr1kzFMj4nn8L5h5iafa2V_MfdXnvVgWltFkjGuKx8Vr7dPn1d-PD4O3ESheNM470_5QDVpw5EtWd9_zM3-b39M0g3eRxkC3rT13jaa0V-EMdy-zUwY-vqt1DMRYfUwUDcuff4b-6qCFLYTGqdL11Oni0Wgp29qOyPB2Q4r_7JgDOSGEsl-mOCCWJ0nXQPZc',
      strategicFunctions: 'Policy Advocacy;Quality Assurance;Market Linkage;Capacity Building',
    }
  })

  const counties = ['Makueni', 'Machakos', 'Kitui', 'Meru', 'Kilifi']
  for (const county of counties) {
    await prisma.statistic.create({
      data: {
        label: county,
        value: Math.floor(Math.random() * 100000) + 50000,
        year: 2023,
        category: 'production',
      }
    })
  }

  for (const name of ['Ministry of Agriculture', 'KALRO', 'USAID', 'KEPHIS']) {
    await prisma.partner.create({
      data: {
        name,
        logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe33dFPETeYlU8H0bLSyKriQ3wD5ZzE55rlcGsG4GVEefQlrCFzy_ZrsvSVPuttGkTPWgOU2xMNtn1VIieog4rxsBSlxp6vgVTPgTdfaUkwoAWEKEUVOKIsWE8AfnOoCXsU0X86syDVNP8us5k_xY_PlhCTku8CZviaYUY6YjeTMV9m8Fu8OolprdUiukxntH3QrWo31tIBjomPoz2TiV8_Oos-feQYbssHNJ2iNQy1puJf4hY5IHo0slwfVRACvC7-QJb19egMuuo',
      }
    })
  }

  const produceItems = [
    { name: 'Apple Mango', alt: 'Premium Apple Mangoes' },
    { name: 'Ngowe', alt: 'Traditional Ngowe Mangoes' },
    { name: 'Kent', alt: 'Export Quality Kent Mangoes' },
    { name: 'Tommy Atkins', alt: 'Vibrant Tommy Atkins' },
  ]
  for (const item of produceItems) {
    await prisma.produce.create({
      data: {
        name: item.name,
        altText: item.alt,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe33dFPETeYlU8H0bLSyKriQ3wD5ZzE55rlcGsG4GVEefQlrCFzy_ZrsvSVPuttGkTPWgOU2xMNtn1VIieog4rxsBSlxp6vgVTPgTdfaUkwoAWEKEUVOKIsWE8AfnOoCXsU0X86syDVNP8us5k_xY_PlhCTku8CZviaYUY6YjeTMV9m8Fu8OolprdUiukxntH3QrWo31tIBjomPoz2TiV8_Oos-feQYbssHNJ2iNQy1puJf4hY5IHo0slwfVRACvC7-QJb19egMuuo',
        displayOrder: produceItems.indexOf(item),
      }
    })
  }

  await prisma.resource.create({
    data: {
      title: 'GAP Certification Manual',
      description: 'Complete guide to Good Agricultural Practices for Kenyan mango farmers.',
      type: 'STANDARD',
      url: '#',
    }
  })

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
