import { useEffect, useState } from 'react';
import axios from '../config/axios';

export default function useMyProduct() {
  const [myProduct, setMyProduct] = useState();

  const getMyProductData = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8000/user/my-product', userId);
      setMyProduct(response.data);
    } catch (error) {
      console.error('Error fetching my product data: ', error);
    }
  };

  useEffect(() => {
    getMyProductData();
  }, []);
  return { myProduct, setMyProduct };
}
