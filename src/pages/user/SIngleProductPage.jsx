import { useModal } from '../../hooks/useModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SingleProductPage() {
  const { onOpenModal } = useModal();
  let { id } = useParams();
  const [item, setItem] = useState({ user: '' });

  const getSingleItem = () => {
    axios.post('/item/get-single-item', { id: id }).then((response) => {
      console.log('ourdata response', response.data);
      setItem(response.data);
    });
  };

  useEffect(() => {
    getSingleItem();
  }, []);

  return (
    <div className="bg-[#F9F9FB] px-12 py-12 space-y-4">
      <div className="w-full bg-white p-6 grid grid-cols-2 rounded-md space-x-6 shadow">
        <div className="flex space-y-4 flex-col ">
          <div className="px-4 text-green-600 bg-green-200 rounded-md w-fit text-lg font-extrabold py-2">
            พร้อมให้เช่า
          </div>
          <h1 className="text-5xl font-bold">{item.title}</h1>
          <div className="bg-[#fafafa] h-[80px] p-2">
            <p>สำหรับการเช่า</p>
            <p className="text-5xl font-bold pl-4">
              ฿{item.price}
              <span className="text-2xl">/วัน</span>
            </p>
          </div>
          <p className="font-bold text-2xl">รายละเอียดสินค้า</p>
          <div className="p-2">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
          <div className="flex gap-4 mb-2">
            <button
              onClick={() => onOpenModal('checkoutModal')}
              className="bg-blue-500 text-white w-6/12 p-4 rounded-md"
            >
              เช่าเลย!
            </button>
            <button className="bg-gray-400 text-white w-3/12 p-4 rounded-md">ส่งข้อความ</button>
          </div>
          <hr />
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <p className="font-bold text-lg">ข้อมูลสินค้า</p>
              <div className="flex gap-4 items-center">
                <div className="w-[32px] h-[32px] bg-blue-500"></div>
                <p className="text-blue-500 text-lg">1110, พระโขนง</p>
              </div>
              <div className="flex gap-4">
                <p className="w-20">รหัสสินค้า</p>
                <p className="text-gray-500">{item.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-20">อัพเดทเมื่อ</p>
                <p className="text-gray-500">{item.updatedAt}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg">ผู้ลงสินค้า</p>
              <div className="flex gap-4 items-center">
                <div className="w-[32px] h-[32px] bg-blue-500"></div>
                <p className="text-blue-500 text-lg">{item.user}</p>
              </div>
              <div className="flex">
                <p className="w-20 text-xs">เป็นสมาชิกเมื่อ</p>
                <span className="text-xs text-gray-500"> 2ปี 4ด</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex space-x-2">
            <p>มีบางอย่างผิดปกติ?</p>
            <p className="text-blue-500 font-bold">แจ้งให้ FIND ตรวจสอบ</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full h-[548px] bg-red-500 rounded-md shadow">
            <img
              src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=3176&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="product"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="w-[180px] h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=3176&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
            <div className="w-[180px] h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=3176&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
            <div className="w-[180px] h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=3176&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-md space-x-6 shadow">
        <p className="font-bold text-lg">คุณอาจจะชอบสิ่งนี้</p>
        <div className="grid grid-cols-5">
          <div>Product Card</div>
          <div>Product Card</div>
          <div>Product Card</div>
          <div>Product Card</div>
          <div>Product Card</div>
        </div>
      </div>
    </div>
  );
}
