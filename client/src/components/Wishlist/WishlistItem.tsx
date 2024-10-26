import { Link } from 'react-router-dom';
import { DeleteIcon } from '../../utils/icons';
import ProductCard from '../common/Cards/ProductCard';

const WishlistItem = ({
  productId,
  productName,
  imageUrl,
  description,
  price,
  wishlistItemId,
  itemIsInStock,
  deleteWishlistItem,
}: {
  productId: string;
  productName: string;
  itemIsInStock: boolean;
  imageUrl: string;
  description: string;
  wishlistItemId: string;
  price: number;
  deleteWishlistItem: (cartItemId: string) => void;
}) => {
  return (
    <div className='relative group'>
      {!itemIsInStock && (
        <div>
          <div className='bg-warning-700 w-full h-12 absolute text-white flex items-center justify-center z-10 mt-[90%] font-semibold'>
            Out of Stock
          </div>
          <div className='absolute w-full h-full bg-black/20' />
        </div>
      )}
      <button
        type='button'
        aria-label={`Remove ${productName} from wishlist`}
        className='zoom-effect absolute right-3 bottom-5 z-10'
        onClick={() => {
          deleteWishlistItem(wishlistItemId);
        }}
      >
        <DeleteIcon />
      </button>
      <Link to={`/product/${productId}`}>
        <ProductCard
          productName={productName}
          price={price}
          description={description}
          imageUrl={imageUrl}
          hoverEffect={false}
        />
      </Link>
    </div>
  );
};

export default WishlistItem;
