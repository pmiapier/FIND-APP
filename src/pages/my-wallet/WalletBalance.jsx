import { useEffect, useState } from 'react';
import blank from '../../images/blank.png';
import axios from '../../config/axios';
import comfirm from '../../utils/sweetAlert/sweetAlert';

export default function WalletBalance() {
  const [balance, setBalance] = useState([]);
  console.log('🚀 ~ file: WalletBalance.jsx:8 ~ WalletBalance ~ balance:', balance);
  const [isLoading,setIsloading] = useState(false)

  const updateWithdraw = async () => {
    const result = await comfirm()
      if(result.isConfirmed){
        console.log("🚀 ~ file: WalletBalance.jsx:14 ~ updateWithdraw ~ a :", result )
        const wallet = await axios.patch('/wallet/withdraw');
        console.log(wallet);
        console.log(wallet.data);
        setIsloading(true)
      }
  };

  const getBalance = async () => {
    const myWallet = await axios.get('/wallet/getWallet');
    console.log(myWallet);
    console.log(myWallet.data);
    setBalance(+myWallet.data.amount);
  };

  useEffect(() => {
    getBalance();
  }, [isLoading]);

  return (
    <>
      {/* ยอดเงิน */}
      <div className="flex flex-col gap-2 bg-white p-4 border  w-[200vh] ">
        <span className="font-bold">ภาพรวมยอดเงิน</span>
        <div className="flex  border-2 flex-1 ">
          <div className="flex flex-col gap-2 flex-1 p-2">
            <span>FIND Balance</span>
            <div className="flex gap-4">
              <span className="font-bold">฿ {balance.toLocaleString()} </span>
              <button className="bg-red-500 w-20 rounded-md text-white" onClick={updateWithdraw}>ถอนเงิน</button>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-center">
            <span className="font-bold">Pending</span>
            <span className="font-bold">฿ 3,550 </span>
          </div>

          {/* Blank */}
          <div className="flex flex-col p-2 gap-2 flex-1">
            <span>บัญชีธนาคารของฉัน</span>
            <div className="flex gap-2">
              <img src={blank} alt="blank" />
              <div>กสิกรไทย (Kbank) 491-30129-2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
