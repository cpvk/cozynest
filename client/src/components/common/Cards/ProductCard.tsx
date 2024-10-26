import { formatPrice } from '../../../utils/format';

const ProductCard = ({
  productName,
  description,
  price,
  imageUrl,
  hoverEffect = true,
}: {
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  hoverEffect?: boolean;
}) => {
  return (
    <div
      className={`cursor-pointer bg-slate-100 transition-transform duration-200 ${
        hoverEffect ? 'hover:scale-[1.02]' : ''
      }`}
    >
      <div className='space-y-2'>
        <img
          src={imageUrl}
          alt={`${productName} Image`}
          loading='lazy'
          decoding='async'
          width={512}
          height={384}
          className='aspect-[4/3] w-full object-cover'
        />
      </div>
      <div className='px-4 pb-4 space-y-1'>
        <div className='flex justify-between items-center'>
          <div className='font-bold text-font-color1 text-lg  py-2'>
            {productName}
          </div>
        </div>
        <div className='line-clamp-2 text-sm text-font-color2 font-semibold'>
          {description}
        </div>
        <div className='font-semibold'>Rs. {formatPrice(price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
