import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/HomePage';

import ProductListingPage from '../pages/user/ProductListingPage';
import SingleProductPage from '../pages/user/SIngleProductPage';
import MyProductPage from '../pages/user/MyProductPage';
import MyRentalItemsPage from '../pages/user/MyRentalItemsPage';
import WalletPage from '../pages/my-wallet/WalletPage';
import StripeSuccess from '../components/checkout/stripe-checkout/StripeSuccess';
import StripeCancelled from '../components/checkout/stripe-checkout/StripeCancelled';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/product-listing', element: <ProductListingPage /> },
      { path: '/single-product', element: <SingleProductPage /> },
      // มีญ่าสร้างpath ข้่างล่างนี้
      { path: '/my-product', element: <MyProductPage /> },
      { path: '/my-rental-items', element: <MyRentalItemsPage /> },
      { path: '/my-wallet', element: <WalletPage /> },
      { path: '/success', element: <StripeSuccess /> },
      { path: '/cancelled', element: <StripeCancelled /> }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router}> </RouterProvider>;
}
