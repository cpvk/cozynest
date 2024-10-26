import { useRecoilValue, useSetRecoilState } from 'recoil';
import { wishlistStore } from '../store/wishlist';
import { authState } from '../store/auth';
import axiosInstance from '../utils/api';
import { useCallback, useState } from 'react';

export const useWishlist = () => {
  const setWishlist = useSetRecoilState(wishlistStore);
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = auth.isAuthenticated;

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.get('/wishlist');
      setWishlist(res.data.wishlist ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, setWishlist]);

  const addToWishlist = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) return;
      await axiosInstance.post('/wishlist', { productId });
      await fetchWishlist();
    },
    [isAuthenticated, fetchWishlist]
  );

  const deleteWishlistItem = useCallback(
    async (wishListItemId: string) => {
      if (!isAuthenticated) return;
      await axiosInstance.delete(`/wishlist/${wishListItemId}`);
      await fetchWishlist();
    },
    [isAuthenticated, fetchWishlist]
  );

  return {
    fetchWishlist,
    addToWishlist,
    deleteWishlistItem,
    loading,
  };
};
