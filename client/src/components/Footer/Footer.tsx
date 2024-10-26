import { Link } from 'react-router-dom';
import Wrapper from '../common/UI/Wrapper';
import { SeparatorLine } from '../common/SeparatorLine';

const Footer = () => {
  return (
    <div>
      <SeparatorLine />
      <Wrapper>
        <div className='lg:w-[80%]  mt-8 text-sm'>
          <div className='md:grid md:grid-cols-3 space-y-4 md:space-x-0'>
            <Link
              to='/home'
              className='text-xl md:text-2xl md:pr-10 font-bold md:pt-2'
            >
              CozyNest
            </Link>
            <div className='flex justify-between md:grid md:grid-cols-2 md:col-span-2'>
              <ul className='text-font-color1 font-medium space-y-4'>
                <h2 className='font-semibold text-font-color2 uppercase'>
                  Links
                </h2>
                <li>
                  <Link to={'/home'}>Home</Link>
                </li>
                <li>
                  <Link to={'/shop'}>Shop</Link>
                </li>
                <li>
                  <Link to={'/about'}>About</Link>
                </li>
                <li>
                  <Link to={'/contact'}>Contact</Link>
                </li>
              </ul>
              <ul className='text-font-color1 font-medium space-y-4'>
                <h2 className='font-semibold text-font-color2 uppercase'>
                  Help
                </h2>
                <li>
                  <Link to={'/home'}>Payment Options</Link>
                </li>
                <li>
                  <Link to={'/shop'}>Returns</Link>
                </li>
                <li>
                  <Link to={'/about'}>Privacy Policies</Link>
                </li>
              </ul>
            </div>
          </div>
          <SeparatorLine />
          <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm text-gray-500 sm:text-center'>
              © 2024 <span className='hover:underline'>CozyNest</span>. All
              Rights Reserved.
            </span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
