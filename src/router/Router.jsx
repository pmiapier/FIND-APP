import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../components/home/Home';
import UserProfile from '../components/user/UserProfile';
import Admin from '../components/admin/AdminProfile';
import ProductListingPage from '../components/user/ProductListingPage';
import SingleProductPage from '../components/user/SIngleProductPage';
import MyProductPage from '../components/user/MyProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profile', element: <UserProfile /> },
      { path: '/Admin', element: <Admin /> },
      { path: '/product-listing', element: <ProductListingPage /> },
      { path: '/single-product', element: <SingleProductPage /> },
      { path: '/my-product', element: <MyProductPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router}> </RouterProvider>;
}
