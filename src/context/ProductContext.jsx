import { createContext, useEffect } from 'react';
import { useState } from 'react';
export const ProductContext = createContext();
import axios from '../config/axios';

export default function ProductContextProvider({ children }) {
  const [myProduct, setMyProduct] = useState([]);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  //# TEE
  const [selectedProduct, setSelectedProduct] = useState(null);

  const editProduct = async (productId) => {
    try {
      const response = await axios.get(`/item/get-single-item/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };

  const saveProductChanges = async (editedProduct) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        'Content-Type': 'multipart/form-data'
      };
      const response = await axios.patch(`/user/updateItem`, editedProduct, { headers });
      setMyProduct((prevItems) => {
        return prevItems.map((item) => (item.id === editedProduct.id ? editedProduct : item));
      });
      console.log('response', response.data);
    } catch (error) {
      console.error('Error saving changes: ', error);
    }
    console.log('Saving changes to product:', editedProduct);
  };

  const updateProductStatus = async (productId) => {
    try {
      const response = await axios.patch(`/user/updateItemStatus/`, { productId });
      // setMyProduct((prevItems) => prevItems.map((item) => (item.id === productId ? response.data : item)));
      getMyProductData();
    } catch (error) {
      console.log('Error updating status: ', error);
    }
  };
  //####

  const getItems = () => {
    axios.get('/item').then((response) => {
      setItems(response.data);
    });
  };

  const getCategory = () => {
    axios.get(`/item/getCategories`).then((response) => {
      setCategory(response.data);
      setCategoryList(response.data);
    });
  };

  const getMyProductData = async (authUser) => {
    try {
      if (authUser && authUser.id) {
        const response = await axios.get('/user/my-product', {
          params: { userId: authUser.id }
        });
        await setMyProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching my product data: ', error);
    }
  };

  useEffect(() => {
    getItems();
    getCategory();
    getMyProductData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        items,
        setItems,
        getItems,
        categoryList,
        selectedProduct,
        setSelectedProduct,
        editProduct,
        clearSelectedProduct,
        saveProductChanges,
        category,
        myProduct,
        setMyProduct,
        getMyProductData,
        updateProductStatus
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
