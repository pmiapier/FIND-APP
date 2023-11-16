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
      <div className="font-bold">Transaction Detail</div>
      <div className="flex justify-between bg-gray-200 p-2">
        <span className="flex flex-1 font-bold">Order Number</span>
        <span className="flex flex-1 font-bold">Date of transaction</span>
        <span className="flex flex-1 font-bold">Status</span>
        <span className="flex flex-1 font-bold">Amount</span>
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
