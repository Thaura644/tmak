import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, organization_name, county } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the 'Producer' category by default for new registrations, or create if it doesn't exist
    let category = await prisma.memberCategory.findFirst({
      where: { name: 'Producer' }
    });

    if (!category) {
      category = await prisma.memberCategory.create({
        data: { name: 'Producer' }
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          password: hashedPassword,
          role: 'MEMBER',
        },
      });

      const slug = organization_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      const member = await tx.member.create({
        data: {
          organization_name,
          slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
          categoryId: category!.id,
          county,
          userId: user.id,
          membership_status: 'inactive',
          year_joined: new Date().getFullYear(),
        },
      });

      return { user, member };
    });

    res.status(201).json({
      message: 'Member registered successfully',
      user: { id: result.user.id, username: result.user.username, role: result.user.role }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

export default router;
