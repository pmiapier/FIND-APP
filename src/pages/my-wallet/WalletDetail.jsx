import { useEffect, useState } from 'react';
import WalletDetailItem from './WalletDetailItem';
import axios from '../../config/axios';


export default function WalletDetail() {
  const [rentee, setRentee] = useState([]);
  const [owner, setOwner] = useState([]);

  const getTransaciton = async () => {
    const getData = await axios.get('/transaction/get-order');
    setRentee(getData.data.orderTransactionRentee);
    setOwner(getData.data.orderTransactionOwner);
  };


  useEffect(() => {
    getTransaciton();

  }, []);

  return (
    <div className="flex flex-col border p-4 w-[200vh]">
      <div className="font-bold">รายละเอียดรายรับของฉัน</div>
      <div className="flex justify-between bg-gray-200 p-2">
        <span className="flex flex-1 font-bold">เลขที่ออเดอร์</span>
        <span className="flex flex-1 font-bold">วันที่ทำการโอนเงิน</span>
        <span className="flex flex-1 font-bold">สถานะ</span>
        <span className="flex flex-1 font-bold">จำนวนเงินที่ได้รับ</span>
        <span className="flex flex-1 font-bold">Role</span>
      </div>
      <div> 
        {rentee.map((el) => (
           <WalletDetailItem key={el.id} deposit={el.deposit} amount={el.amount} rentee_status={el.rentee_status} renteeId={el.renteeId} createdAt={el.createdAt}  />
        ))}
        {owner.map((el) => (
           <WalletDetailItem key={el.id} deposit={el.deposit} amount={el.amount} owner_status={el.owner_status} ownerId={el.ownerId} createdAt={el.createdAt} />
        ))}

        </div>
    </div>
  );
}
