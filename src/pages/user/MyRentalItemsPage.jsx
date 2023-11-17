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
    <div className=" flex flex-col justify-center px-20 py-5">
      <div className="w-full flex justify-center px-20 py-5">
        <div className="flex gap-5 justify-start items-center bg-yellow-300 w-full rounded-xl px-5 py-5 shadow-lg">
          <div className="text-[40px] px-5 font-extrabold text-white">MY RENTAL ITEMS</div>
        </div>
      </div>
      <div className=" w-full grid justify-items-center items-center grid-cols-2 gap-9 px-[155px]">
        {items
          ? items.map((item, index) => {
            return <MyRentalItemCard key={index} data={item} />;
          })
          : null}
      </div>
    </div>
  );
}
