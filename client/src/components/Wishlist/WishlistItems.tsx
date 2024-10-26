import { useRecoilValue } from 'recoil';
import { wishlistStore } from '../../store/wishlist';
import WishlistItem from './WishlistItem';
import { useWishlist } from '../../hooks/useWishlist';
import WishlistIsEmpty from './WishlistIsEmpty';
import Wrapper from '../common/UI/Wrapper';

const WishlistItems = () => {
  const { deleteWishlistItem } = useWishlist();
  const wishlist = useRecoilValue(wishlistStore);

  if (!wishlist || wishlist.length === 0) {
    return <WishlistIsEmpty />;
  }
  return (
    <Wrapper>
      <div className='grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3'>
        {wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            productId={item.product.id}
            productName={item.product.productName}
            imageUrl={item.product.imageUrl}
            price={item.product.price}
            description={item.product.description}
            wishlistItemId={item.id}
            itemIsInStock={item.product.stockQuantity > 0}
            deleteWishlistItem={deleteWishlistItem}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default WishlistItems;
