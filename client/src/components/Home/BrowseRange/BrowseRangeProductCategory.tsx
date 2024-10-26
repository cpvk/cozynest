import BrowseCard from '../../common/Cards/BrowseCard';
import LivingRoomImage from '../../../assets/images/BrowseRangeImages/livingimage.jpg';
import DiningRoomImage from '../../../assets/images/BrowseRangeImages/diningimage.jpg';
import BedRoomImage from '../../../assets/images/BrowseRangeImages/bedroomimage.jpg';
import Wrapper from '../../common/UI/Wrapper';

const BrowseRangeProductCategory = () => {
  return (
    <Wrapper>
      <BrowseCard imgUrl={DiningRoomImage} label='Dining Room' />
      <BrowseCard imgUrl={LivingRoomImage} label='Living Room' />
      <BrowseCard imgUrl={BedRoomImage} label='Bedroom' />
    </Wrapper>
  );
};

export default BrowseRangeProductCategory;
