import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const UserValidationSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  address: z.string().optional(),
  phone_number: z.string().min(10).max(10).optional(),
});

const register = async (req: Request, res: Response) => {
  try {
    const user = UserValidationSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      process.env.TOKEN_KEY || '',
      {
        expiresIn: '1w',
      }
    );

    res.status(201).json({
      userDetails: {
        email: newUser.email,
        token: token,
        username: newUser.username,
        id: newUser.id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default register;
