import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../common/Cards/ProductCard';
import Wrapper from '../common/UI/Wrapper';
import { BACKEND_URL } from '../../utils/api';
import { Product } from '../../typings/productTypes';

const SKELETON_COUNT = 8;

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const category = searchParams.get('category');

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = category
          ? `${BACKEND_URL}/product/category/${encodeURIComponent(category)}`
          : `${BACKEND_URL}/product/bulk`;
        const response = await axios.get(url);
        if (!cancelled) setProducts(response.data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <Wrapper>
      {category && !loading && !error && (
        <h1 className='mt-10 text-2xl font-bold capitalize text-font-primary'>
          {category}
        </h1>
      )}
      {loading && (
        <div
          className='my-10 grid w-full grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-4 lg:grid-cols-3 2xl:gap-8 2xl:grid-cols-4'
          aria-label='Loading products'
        >
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className='w-64 animate-pulse justify-self-center'>
              <div className='aspect-[4/3] bg-slate-200' />
              <div className='space-y-2 px-4 py-4'>
                <div className='h-4 w-3/4 bg-slate-200' />
                <div className='h-3 w-full bg-slate-200' />
                <div className='h-4 w-1/3 bg-slate-200' />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && error && (
        <p className='my-16 text-center text-font-color2'>
          Could not load products. Please try again later.
        </p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className='my-16 text-center text-font-color2'>
          No products found{category ? ` for “${category}”` : ''}.
        </p>
      )}
      {!loading && !error && products.length > 0 && (
        <div className='my-10 grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-4 lg:grid-cols-3 2xl:gap-8 2xl:grid-cols-4 space-y-6 md:space-y-0'>
          {products.map((product) => (
            <Link
              className='flex justify-center items-center'
              key={product.id}
              to={`/product/${product.id}`}
            >
              <div className='w-64 relative'>
                <ProductCard
                  productName={product.productName}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  price={product.price}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Products;
