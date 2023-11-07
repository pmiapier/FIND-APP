import { useModal } from '../hooks/useModal';
import UserAddProduct from '../components/items/UserAddProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function AddItemModal() {
  const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
  const [category,setCategory] = useState([]) 
  useEffect(()=>{
    getCategory()
  },[])
  const getCategory=async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/item/getCategories`)
      setCategory(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isOpenModal && modalType === 'AddItemModal' && (
        <div>
          <div className="bg-gray-900 fixed inset-0 bg-opacity-40 z-20"></div>
          <div className="fixed inset-0 z-30">
            <div className="flex justify-center items-center min-h-full ">
              <UserAddProduct category={category} onCloseModal={onCloseModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
