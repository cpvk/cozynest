import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

const productSelect = {
  id: true,
  product_name: true,
  description: true,
  image_url: true,
  price: true,
  stock_quantity: true,
  category: true,
  type: true,
} as const;

type ProductRow = {
  id: string;
  product_name: string;
  description: string;
  image_url: string;
  price: number;
  stock_quantity: number;
  category: string;
  type: string;
};

const formatProduct = (product: ProductRow) => ({
  id: product.id,
  productName: product.product_name,
  description: product.description,
  imageUrl: product.image_url,
  price: product.price,
  stockQuantity: product.stock_quantity,
  category: product.category,
  type: product.type,
});

const bulkFilter = async (req: Request, res: Response) => {
  try {
    const result = await prisma.product.findMany({ select: productSelect });
    res.set('Cache-Control', 'public, max-age=60');
    res.status(200).json(result.map(formatProduct));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const idFilter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      select: productSelect,
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.set('Cache-Control', 'public, max-age=60');
    res.status(200).json(formatProduct(product));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const categoryFilter = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const result = await prisma.product.findMany({
      where: { category },
      select: productSelect,
    });
    res.set('Cache-Control', 'public, max-age=60');
    res.status(200).json(result.map(formatProduct));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};
export const productFilter = {
  categoryFilter,
  bulkFilter,
  idFilter,
};
