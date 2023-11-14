import { useEffect, useState } from 'react';
import WalletDetailItem from './WalletDetailItem';
import axios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';

export default function WalletDetail() {
  const { authUser } = useAuth();
  console.log("🚀 ~ file: WalletDetail.jsx:8 ~ WalletDetail ~ authUser:", authUser)
  const [rentee, setRentee] = useState([]);
  console.log('🚀 ~ file: WalletDetail.jsx:7 ~ WalletDetail ~ rentee:', rentee);
  const [owner, setOwner] = useState([]);
  console.log('🚀 ~ file: WalletDetail.jsx:9 ~ WalletDetail ~ owner:', owner);
  
 

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

        {/* {authUser !== rentee
          ? rentee.map((el) => <WalletDetailItem key={el.id} deposit={el.deposit} amount={el.amount} status={el.status} renteeId={el.renteeId} createdAt={el.createdAt} />)
          : owner.map((el) => <WalletDetailItem key={el.id} deposit={el.deposit} amount={el.amount} status={el.status} ownerId={el.ownerId} createdAt={el.createdAt} />)} */}
      </div>
    </div>
  );
}
