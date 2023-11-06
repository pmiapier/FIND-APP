import { useContext } from 'react';

import { ProductContext } from '../context/ProductContext';

export function useProduct() {
  return useContext(ProductContext);
}
