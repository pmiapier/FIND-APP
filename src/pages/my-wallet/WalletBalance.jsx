import { useEffect, useState } from 'react';
import blank from '../../images/blank.png';
import axios from '../../config/axios';
import comfirm from '../../utils/sweetAlert/sweetAlert';
import { useAuth } from '../../hooks/useAuth';

export default function WalletBalance() {
  const { authUser } = useAuth();
  const [balance, setBalance] = useState([]);
  const [isLoading,setIsloading] = useState(false)
  const [pendingRent,setPendingRent] = useState([])


  const getPending = async () => {
    const getData = await axios.get('/transaction/get-pending');
    setPendingRent(getData.data.sumOwnerAndRent)
  
  };

  const updateWithdraw = async () => {
    const result = await comfirm()
      if(result.isConfirmed){
        const wallet = await axios.patch('/wallet/withdraw');
        setIsloading(true)
      }
  };

  const getBalance = async () => {
    const myWallet = await axios.get('/wallet/getWallet');

    setBalance(+myWallet.data.amount);
  };

  useEffect(() => {
    getBalance();
    getPending()
  }, [isLoading]);

  return (
    <>
      {/* ยอดเงิน */}
      <div className="flex flex-col gap-2 bg-white p-4 border  w-[200vh] ">
        <span className="font-bold">Over view</span>
        <div className="flex  border-2 flex-1 ">
          <div className="flex flex-col gap-2 flex-1 p-2">
            <span>FIND Balance</span>
            <div className="flex gap-4">
              <span className="font-bold">฿ {balance.toLocaleString()} </span>
              <button className="bg-red-500 w-20 rounded-md text-white hover:bg-red-600" onClick={updateWithdraw}>Withdraw</button>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-center">
            <span className="font-bold">Pending</span>
            <span className="font-bold">{pendingRent.toLocaleString()} </span>
          </div>

          {/* Blank */}
          <div className="flex flex-col justify p-2 gap-2 flex-1">
            <span>My Bank Account</span>
            <div className="flex gap-2">
              <img src={blank} alt="blank" />
              <div className='flex justify-center items-center'>KASIKORN BANK (Kbank) 491-30129-2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
