import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';


const loginValidationSchema = z.object({
  username: z.string().min(1).optional(),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

const login = async (req: Request, res: Response) => {
  try {
    const { success } = loginValidationSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(411)
        .json({ message: 'Please enter valid credentials' });
    }

    const { username, password, email } = req.body;

    if (!username && !email) {
      return res
        .status(400)
        .json({ message: 'Please provide either username or email' });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.TOKEN_KEY || '',
        {
          expiresIn: '1w',
        }
      );

      res.status(201).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
          id: user.id,
        },
      });
    } else {
      res.status(401).send('Invalid credentials. Please try again');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default login;
