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
    <div className="bg-primaryBackground px-20 py-5 ">
      <div className="text-[30px] font-bold text-center">MY RENTED ITEMS</div>
      <div className="flex flex-col gap-5 z-0 items-center">
        {items
          ? items.map((item, index) => {
              return <MyRentedItemCard key={index} data={item} />;
            })
          : null}
      </div>
    </div>
  );
}
