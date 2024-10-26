import { EmptyHeartIcon, FilledHeartIcon } from '../../utils/icons';
import { useRecoilValue } from 'recoil';
import toast from 'react-hot-toast';
import { useWishlist } from '../../hooks/useWishlist';
import { wishlistStore } from '../../store/wishlist';
import { authState } from '../../store/auth';

const AddToWishlist = ({ productId }: { productId: string }) => {
  const auth = useRecoilValue(authState);
  const { addToWishlist, deleteWishlistItem } = useWishlist();
  const wishlist = useRecoilValue(wishlistStore);

  // Derived from the store (fetched once in RootLayout), not local state:
  // syncing it in an effect that also refetched caused an endless fetch loop.
  const wishlistItem = wishlist.find((item) => item.product.id === productId);
  const clicked = wishlistItem !== undefined;

  const handleClick = async () => {
    if (!auth.isAuthenticated) {
      toast.error('Please log in first!');
      return;
    }
    try {
      if (!clicked) {
        await addToWishlist(productId);
      } else if (wishlistItem) {
        await deleteWishlistItem(wishlistItem.id);
      }
    } catch {
      toast.error('Could not update wishlist');
    }
  };

  return (
    <button
      type='button'
      className='flex w-full items-center justify-center gap-1 h-12 border-2 border-primary rounded-full select-none text-primary font-semibold transition-transform hover:scale-[1.012] active:scale-100'
      onClick={handleClick}
    >
      {clicked ? 'Saved to wishlist' : 'Add to wishlist'}
      {!clicked ? <EmptyHeartIcon /> : <FilledHeartIcon />}
    </button>
  );
};

export default AddToWishlist;
