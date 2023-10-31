import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/HomePage';

import ProductListingPage from '../pages/user/ProductListingPage';
import SingleProductPage from '../pages/user/SIngleProductPage';
import MyProductPage from '../pages/user/MyProductPage';
import { MyRentalItems } from '../pages/user/MyRentalItems';
import WalletPage from '../pages/my-wallet/WalletPage';


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
      { path: '/my-rental-items', element: <MyRentalItems /> },
      { path: '/my-wallet', element: <WalletPage /> },
 
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router}> </RouterProvider>;
}
