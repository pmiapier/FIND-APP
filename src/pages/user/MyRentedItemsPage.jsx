import { useEffect, useState } from 'react';
import MyRentedItemCard from '../../components/cards/MyRentedItemCard';
import axios from '../../config/axios';

export default function MyRentedItemsPage() {
  const [items,setItems] = useState([])
  useEffect(()=>{
    getMyRentedItem()
  },[])
  const getMyRentedItem = async()=>{
    const res = await axios.get(`/item/myRentedItem`)
    console.log(res.data[0]);
    setItems(res.data)
  }
  return (
    <div className="bg-primaryBackground px-20 py-5 ">
      <div className="text-[30px]">My Rented Items การเช่าของฉัน</div>
      <div className="flex flex-col gap-5">
        {items?items.map((item,index)=>{
          console.log(item)
          return (<MyRentedItemCard key={index} data={item}/>)
        }):null}

      </div>
    </div>
  );
}
