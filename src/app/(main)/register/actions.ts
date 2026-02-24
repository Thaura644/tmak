'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
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
    const payload = await getPayload({ config })

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
    })

    if (existingUser.docs.length > 0) {
      return { error: 'User with this email already exists' }
    }

    // Create User
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'member',
      },
    })

    // Create Member profile
    // Generate slug from organization name
    const slug = organizationName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    await payload.create({
      collection: 'members',
      data: {
        organization_name: organizationName,
        slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
        category: categoryId,
        county,
        user: user.id,
        membership_status: 'inactive', // Default to inactive until verified
      },
    })

    // Success - redirect to login
  } catch (error: any) {
    console.error('Registration error:', error)
    return { error: error.message || 'Something went wrong' }
  }

  redirect('/login?registered=true')
}
