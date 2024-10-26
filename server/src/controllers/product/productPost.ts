import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { z } from 'zod';


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ProductValidationSchema = z.object({
  product_name: z.string().min(3),
  description: z.string().min(10).max(200),
  price: z.number().min(0),
  stock_quantity: z.number().min(0).int(),
  category: z.enum(['dining Room', 'bedroom', 'living room']),
  type: z.enum([
    'sofa',
    'table',
    'chair',
    'bed',
    'ottoman',
    'dresser',
    'bookshelf',
    'tv stand',
    'desk',
    'shoe rack',
  ]),
  image_url: z.string().url(),
});

const productPost = async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error('Image not provided');
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const { product_name, description, price, stock_quantity, category, type } =
      req.body;

    const productData = {
      product_name,
      description,
      price: parseFloat(price),
      stock_quantity: parseInt(stock_quantity),
      category: category.toLowerCase(),
      type: type.toLowerCase(),
      image_url: imageUrl,
    };

    const product = ProductValidationSchema.parse(productData);

    const newProduct = await prisma.product.create({ data: product });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

export default productPost;
