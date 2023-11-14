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
import MyAccountDetailPage from '../pages/user/MyAccountDetailPage';
import MyRentedItemsPage from '../pages/user/MyRentedItemsPage';
import ItemDisputePage from '../pages/user/ItemDisputePage';
import AddProductPage from '../pages/user/AddProductPage';
import EditProductPage from '../pages/user/EditProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/product-listing', element: <ProductListingPage /> },
      { path: '/single-product/:id', element: <SingleProductPage /> },
      // มีญ่าสร้างpath ข้่างล่างนี้
      {
        path: '/my-product',
        element: <MyProductPage />
      },
      { path: '/add-new-product', element: <AddProductPage /> },
      { path: '/edit-product/:id', element: <EditProductPage /> },
      { path: '/my-rental-items', element: <MyRentalItemsPage /> },
      { path: '/my-wallet', element: <WalletPage /> },
      { path: '/success', element: <StripeSuccess /> },
      { path: '/cancelled', element: <StripeCancelled /> },
      { path: '/myaccount', element: <MyAccountDetailPage /> },
      { path: '/my-rented-items', element: <MyRentedItemsPage /> },
      { path: 'my-rental-items/item-dispute', element: <ItemDisputePage /> },
      { path: 'my-rented-items/item-dispute', element: <ItemDisputePage /> }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router}> </RouterProvider>;
}
