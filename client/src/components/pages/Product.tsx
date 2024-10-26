import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../common/Loader/Loader';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';
import { ProductDetail } from '../../typings/productTypes';
import { formatPrice } from '../../utils/format';
import Wrapper from '../common/UI/Wrapper';
import AddToCartButton from '../common/Buttons/AddToCartButton';
import toast from 'react-hot-toast';
import AddToWishlist from '../Product/AddToWishlist';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/product/${productId}`
        );
        if (!cancelled) setProduct(response.data);
      } catch (error) {
        console.error(error);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (notFound || !product) {
    return (
      <Wrapper>
        <div className='my-16 space-y-4 text-center'>
          <p className='text-font-color2'>This product could not be found.</p>
          <Link to='/shop' className='font-semibold text-primary underline'>
            Back to shop
          </Link>
        </div>
      </Wrapper>
    );
  }

  const inStock = product.stockQuantity > 0;

  return (
    <Wrapper>
      <div className='space-y-6 max-w-[25rem] md:space-y-[unset] md:max-w-[unset] md:flex md:gap-6 tracking-wide my-10'>
        <div className='md:flex-grow md:relative overflow-hidden'>
          <img
            src={product.imageUrl}
            alt={product.productName}
            width={600}
            height={450}
            className='aspect-[4/3] w-full max-w-[600px] object-cover md:absolute md:h-full'
          />
        </div>
        <div className='space-y-4 md:max-w-[50%] md:p-10 md:space-y-8'>
          <div className='text-2xl font-semibold md:text-4xl'>
            {product.productName}
          </div>
          <div className='font-semibold md:text-lg text-font-color2'>
            <span className='text-sm'>Rs </span>
            {formatPrice(product.price)}
          </div>
          <p
            className={`text-sm font-semibold ${
              inStock ? 'text-success-700' : 'text-warning-700'
            }`}
          >
            {inStock ? 'In stock' : 'Out of stock'}
          </p>
          <div className='text-sm font-medium !leading-[1.5rem] tracking-wider  md:tracking-widest'>
            {product.description}
          </div>

          <div className='flex-grow space-y-4'>
            <AddToCartButton
              productId={productId ?? ''}
              quantity={1}
              notify={() => {
                toast.success('Item added to cart');
              }}
            />
            <AddToWishlist productId={product.id} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Product;
