import { createContext, useEffect } from 'react';
import { useState } from 'react';
export const ProductContext = createContext();
import axios from '../config/axios';


export default function ProductContextProvider({ children }) {
  const [items, setItems] = useState([]); // [{}
  const [categoryList,setCategoryList] = useState([])

  const getItems = () => {
    axios.get('/item').then((response) => {
      setItems(response.data);
    });
  };




  const getCategory = () =>{
    axios.get(`/item/getCategories`).then(response=>{
      setCategoryList(response.data)
    })
  }

  useEffect(() => {
    getItems();
    getCategory()
  }, []);

  return <ProductContext.Provider value={{ items, setItems, getItems,categoryList }}>{children}</ProductContext.Provider>;
}
