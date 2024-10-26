import { Response } from 'express';
import { CustomeRequests } from '../../types/request';
import prisma from '../../lib/prisma';
import { number, string, z } from 'zod';

const cartInput = z.object({
  product_id: string(),
  user_id: string(),
  quantity: number(),
});

type CartInputSchema = z.infer<typeof cartInput>;


export const addItemToCart = async (req: CustomeRequests, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id;

  const cartData = {
    user_id: userId,
    product_id: productId,
    quantity,
  };
  const parseResponse = cartInput.safeParse(cartData);

  if (!parseResponse.success) {
    return res.status(400).json({
      message: 'Invalid data format',
    });
  }

  const cart = parseResponse.data as CartInputSchema;

  try {
    const newProduct = await prisma.cart.create({
      data: {
        ...cart,
      },
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while adding the item to the cart.' });
  }
};

export const updateCartItem = async (req: CustomeRequests, res: Response) => {
  const { cartId } = req.params;
  const { quantity } = req.body;
  const userId = req.user?.id;

  try {
    const updatedProduct = await prisma.cart.update({
      where: {
        id: cartId,
        user_id: userId,
      },
      data: {
        quantity,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the cart item.' });
  }
};

export const deleteCartItem = async (req: CustomeRequests, res: Response) => {
  const { cartId } = req.params;
  const userId = req.user?.id;

  try {
    await prisma.cart.delete({
      where: {
        id: cartId,
        user_id: userId,
      },
    });

    res.status(204).json({ message: 'Cart item deleted.' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the cart item.' });
  }
};
