import { useEffect, useState } from 'react';
import MyItemCard from '../../components/cards/MyItemCard';

import axios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useProduct } from '../../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

export default function MyProductPage() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { editProduct, myProduct, setMyProduct, getMyProductData } = useProduct();

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete('http://localhost:8000/user/deleteItem', { data: { itemId } });
      setMyProduct((prevProduct) => prevProduct.filter((product) => product.id !== itemId));
      toast.success('ลบสินค้าเรียบร้อบแล้ว', {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.log('error deleting product', error);
    }
  };

  const goToAddProductPage = () => {
    navigate('/add-new-product');
  };

  const handleEditItem = async (product) => {
    await editProduct(product);
    navigate(`/edit-product/${product}`);
  };

  useEffect(() => {
    getMyProductData(authUser);
  }, [authUser]);

  return (
    <div className="flex flex-col bg-primaryBackground px-10 py-10 gap-10">
      <div className="text-lg">You have {myProduct.length} items in total</div>
      <div
        onClick={() => {
          goToAddProductPage();
          // onOpenModal('AddItemModal');
          // console.log('test add pd');
        }}
        className="flex gap-5 justify-start items-center bg-white px-5 py-5 shadow-lg cursor-pointer"
      >
        <div className=" flex text-5xl font-thin text-red-700 pb-[10px]">+</div>
        <div className="text-2xl">Add new item</div>
      </div>

      <div className="grid grid-cols-2 gap-6 justify-around">
        {myProduct.map((product) => {
          return (
            <MyItemCard
              // getMyProductData={getMyProductData}
              key={product.id}
              product={product}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          );
        })}
      </div>
    </div>
  );
}
