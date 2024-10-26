import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Loader from './components/common/Loader/Loader';
import { lazy, Suspense } from 'react';
import NotFoundPage from './components/pages/NotFoundPage';

const Wishlist = lazy(() => import('./components/pages/Wishlist'));
const HomePage = lazy(() => import('./components/pages/Home'));
const ShopPage = lazy(() => import('./components/pages/Shop'));
const ProductPage = lazy(() => import('./components/pages/Product'));
const CartPage = lazy(() => import('./components/pages/Cart'));
const AboutPage = lazy(() => import('./components/pages/About'));
const ContactPage = lazy(() => import('./components/pages/Contact'));
const LoginPage = lazy(() => import('./components/pages/auth/Login/Login'));
const SignupPage = lazy(() => import('./components/pages/auth/Signup/Signup'));
const AddProductPage = lazy(
  () => import('./components/pages/Admin/Product/AddProduct')
);

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      }
    >
      <Route index element={<HomePage />} />
      <Route path='home' element={<HomePage />} />
      <Route path='shop' element={<ShopPage />} />
      <Route path='product/:productId' element={<ProductPage />} />
      <Route path='cart' element={<CartPage />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='contact' element={<ContactPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='admin/addproduct' element={<AddProductPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={Router} />
    </RecoilRoot>
  );
};

export default App;
