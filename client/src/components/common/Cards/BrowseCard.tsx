import { Link } from 'react-router-dom';

const BrowseCard = ({ imgUrl, label }: { imgUrl: string; label: string }) => {
  return (
    <div className='transition-transform duration-200 hover:scale-[1.015]'>
      <Link
        to={`/shop?category=${encodeURIComponent(label.toLowerCase())}`}
        className='cursor-pointer group flex flex-col items-center gap-2'
      >
        <div className='space-y-2'>
          <img
            src={imgUrl}
            alt={label}
            loading='lazy'
            decoding='async'
            width={381}
            height={480}
            className='aspect-[381/480] w-full object-cover'
          />
        </div>
        <div className='font-bold text-font-primary text-lg inline-flex text-center group-hover:border-b group-hover:border-font-primary'>
          {label}
        </div>
      </Link>
    </div>
  );
};

export default BrowseCard;
