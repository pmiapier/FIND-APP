import { useEffect, useState } from 'react';
import MyRentalItemCard from '../../components/cards/MyRentalItemCard';
import axios from '../../config/axios';

export default function MyRentalItemsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getMyRentalItem();
  }, []);

  const getMyRentalItem = async () => {
    const res = await axios.get(`/item/myRentalItem`);
    setItems(res.data);
  };

  return (
    <div className="bg-primaryBackground px-20 py-5 text-center">
      <div className="text-[30px] font-bold">MY RENTAL ITEMS</div>
      <div className="flex flex-col gap-5 items-center">
        {items
          ? items.map((item, index) => {
              return <MyRentalItemCard key={index} data={item} />;
            })
          : null}
      </div>
    </div>
  );
}
