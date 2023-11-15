import { useEffect, useState } from 'react';
import MyItemCard from '../../components/cards/MyItemCard';
import axios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useProduct } from '../../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

export default function MyProductPage() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { editProduct, myProduct, setMyProduct, getMyProductData } = useProduct();

  const handleDeleteItem = async (itemId) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('/user/deleteItem', { data: { itemId } });
          setMyProduct((prevProduct) => prevProduct.filter((product) => product.id !== itemId));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          });
        }
      });
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'There was a problem deleting the item.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
