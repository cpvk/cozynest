import { Response } from 'express';
import { CustomeRequests } from '../../types/request';
import prisma from '../../lib/prisma';
import { string, z } from 'zod';

const wishlistInput = z.object({
  product_id: string(),
  user_id: string(),
});

type WishlistInputSchema = z.infer<typeof wishlistInput>;


export const addItemToWishlist = async (
  req: CustomeRequests,
  res: Response
) => {
  const { productId } = req.body;
  const userId = req.user?.id;

  const wishlistData = {
    user_id: userId,
    product_id: productId,
  };
  const parseResponse = wishlistInput.safeParse(wishlistData);

  if (!parseResponse.success) {
    return res.status(400).json({
      message: 'Invalid data format',
    });
  }

  const wishlist = parseResponse.data as WishlistInputSchema;

  try {
    const newProduct = await prisma.wishlist.create({
      data: {
        ...wishlist,
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

export const removeFromWishlist = async (
  req: CustomeRequests,
  res: Response
) => {
  const { wishlistItemId } = req.params;
  const userId = req.user?.id;
  console.log(wishlistItemId);

  try {
    await prisma.wishlist.delete({
      where: {
        id: wishlistItemId,
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

export const getAllItem = async (req: CustomeRequests, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        wishlist: {
          select: {
            id: true,
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
    const [userWishlist] = result;

    const formattedWishlistItems = userWishlist.wishlist.map((item) => ({
      id: item.id,
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

    res.status(200).json({ wishlist: formattedWishlistItems });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving cart items.' });
  }
};
