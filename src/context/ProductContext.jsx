import { createContext, useEffect } from 'react';
import { useState } from 'react';
export const ProductContext = createContext();
import axios from '../config/axios';

export default function ProductContextProvider({ children }) {
  const [items, setItems] = useState([]); // [{}
  const [category, setCategory] = useState([]);

  const getItems = () => {
    axios.get('/item').then((response) => {
      setItems(response.data);
    });
  };

  const getCategory = () => {
    axios.get(`/item/getCategories`).then((response) => {
      setCategory(response.data);
    });
  };

  useEffect(() => {
    getItems();
    getCategory();
  }, []);

  return <ProductContext.Provider value={{ items, setItems, getItems, category }}>{children}</ProductContext.Provider>;
}
