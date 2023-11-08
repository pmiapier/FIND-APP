import { useState } from 'react';
import axios from '../config/axios';

const useEditProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log('selectedProduct in useEditProduct', selectedProduct);
  const editProduct = async (productId) => {
    try {
      const response = await axios.post('/item/get-single-item', { id: productId });
      console.log('response Data in editProduct hooks:', response.data);
      setSelectedProduct(response.data);
    } catch (error) {
      console.log(error);
    }

    console.log('selectedProduct in editProduct', selectedProduct);
  };

  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };

  const saveProductChanges = (editedProduct) => {
    console.log('Saving changes to product:', editedProduct);
  };

  return {
    selectedProduct,
    editProduct,
    clearSelectedProduct,
    saveProductChanges
  };
};

export default useEditProduct;
