import { useEffect, useState } from 'react';
import MyItemCard from '../../components/cards/MyItemCard';
import { useModal } from '../../hooks/useModal';
import AddItemModal from '../../modal/AddItemModal';
import axios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useEditProduct from '../../hooks/useEditProduct';

export default function MyProductPage() {
  const [myProduct, setMyProduct] = useState([]);
  const { authUser } = useAuth();
  const { onOpenModal, setProductId } = useModal();

  const { selectedProduct, editProduct, clearSelectedProduct, saveProductChanges } = useEditProduct();

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

  const getMyProductData = async () => {
    try {
      if (authUser && authUser.id) {
        const response = await axios.get('http://localhost:8000/user/my-product', {
          params: { userId: authUser.id }
        });
        setMyProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching my product data: ', error);
    }
  };

  const handleEditItem = (product) => {
    setProductId(product);
    editProduct(product);
    onOpenModal('AddItemModal');
  };

  useEffect(() => {
    getMyProductData();
  }, [authUser]);

  return (
    <div className="flex flex-col bg-primaryBackground px-10 py-10 gap-10">
      <div className="text-lg">You have 8 items in total</div>
      <div
        onClick={() => {
          onOpenModal('AddItemModal');
          // console.log('test add pd');
        }}
        className="flex gap-5 justify-start items-center bg-white px-5 py-5 shadow-lg cursor-pointer"
      >
        <div className=" flex text-5xl font-thin text-red-700 pb-[10px]">+</div>
        <div className="text-2xl">Add new item</div>
      </div>

      <div className="grid grid-cols-2 gap-6 justify-around">
        {myProduct.map((product) => {
          console.log(product)
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
      <AddItemModal />
    </div>
  );
}
