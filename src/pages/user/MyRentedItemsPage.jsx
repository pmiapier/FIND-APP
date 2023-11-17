import { useEffect, useState } from 'react';
import MyRentedItemCard from '../../components/cards/MyRentedItemCard';
import axios from '../../config/axios';

export default function MyRentedItemsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getMyRentedItem();
  }, []);
  const getMyRentedItem = async () => {
    const res = await axios.get(`/item/myRentedItem`);
    setItems(res.data);
  };
  return (
    <div className=" px-20 py-5 ">
      <div className="w-full flex justify-center px-20 py-5">
        <div className="flex gap-5 justify-start items-center bg-blue-300 w-full rounded-xl px-5 py-5 shadow-lg">
          <div className="text-[40px] font-extrabold px-5 text-white">MY RENTED ITEMS</div>
        </div>
      </div>
      <div className="w-full grid justify-items-center items-center grid-cols-2 gap-9 px-[155px]">
        {items
          ? items.map((item, index) => {
            return <MyRentedItemCard key={index} data={item} />;
          })
          : null}
      </div>
    </div>
  );
}
