import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import prisma from '../lib/prisma';
import { CustomeRequests } from '../types/request';


const authenticateUser = async (
  req: CustomeRequests,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY || ''
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.error('Error in authenticateUser middleware:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticateUser;
