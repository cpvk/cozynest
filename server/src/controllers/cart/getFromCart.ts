import { Response } from 'express';
import { CustomeRequests } from '../../types/request';
import prisma from '../../lib/prisma';


export const getAllItemsFromUserCart = async (
  req: CustomeRequests,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const result = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        cart: {
          select: {
            id: true,
            quantity: true,
            user_id: true,
            product: {
              select: {
                id: true,
                product_name: true,
                description: true,
                image_url: true,
                price: true,
                stock_quantity: true,
              },
            },
          },
        },
      },
    });
    const [userCart] = result;

    const formattedCartItems = userCart.cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      userId: item.user_id,
      product: {
        id: item.product.id,
        productName: item.product.product_name,
        description: item.product.description,
        imageUrl: item.product.image_url,
        price: item.product.price,
        stockQuantity: item.product.stock_quantity,
      },
    }));

    res.status(200).json({ cartItems: formattedCartItems });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving cart items.' });
  }
};

export const getCartItemById = async (req: CustomeRequests, res: Response) => {
  const { cartId } = req.params;

  try {
    const cartItem = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    if (!cartItem) {
      res.status(404).json({ error: 'Cart item not found.' });
      return;
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the cart item.' });
  }
};
