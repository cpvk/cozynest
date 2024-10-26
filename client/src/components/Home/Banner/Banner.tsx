import backDropImage from '../../../assets/images/homeMainImage.jpg';
import BannerBox from './BannerBox';

const Banner = () => {
  return (
    <div>
      <div
        className='bg-no-repeat bg-cover bg-center w-full h-[95vh] md:bg-bottom md:h-[80vh] relative pt-20'
        style={{ backgroundImage: `url(${backDropImage})` }}
      >
        <BannerBox />
      </div>
    </div>
  );
};

export default Banner;
