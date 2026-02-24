'use server'

import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registerMember(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const organizationName = formData.get('organizationName') as string
  const categoryId = formData.get('category') as string
  const county = formData.get('county') as string

  if (!email || !password || !organizationName || !categoryId || !county) {
    return { error: 'All fields are required' }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: 'User with this email already exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create User and Member in a transaction
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'MEMBER',
        },
      })

      const slug = organizationName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

      await tx.member.create({
        data: {
          userId: user.id,
          organizationName,
          slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
          categoryId,
          county,
          membershipStatus: 'PENDING',
        },
      })
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    return { error: error.message || 'Something went wrong' }
  }

  redirect('/login?registered=true')
}

export async function updateMemberProfile(memberId: string, data: any) {
    return prisma.member.update({
        where: { id: memberId },
        data,
    })
}
