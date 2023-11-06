import { createContext, useEffect } from 'react';
import { useState } from 'react';
export const ProductContext = createContext();
import axios from '../config/axios';

export default function ProductContextProvider({ children }) {
  const [items, setItems] = useState([]); // [{}

  const getItems = () => {
    axios.get('/item').then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return <ProductContext.Provider value={{ items, setItems, getItems }}>{children}</ProductContext.Provider>;
}
