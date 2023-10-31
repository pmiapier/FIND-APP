import blank from "../../images/blank.png"

export default function WalletBalance() {
  return (
    <>
      {/* ยอดเงิน */}
      <div className="flex flex-col gap-2 bg-white p-4 border  w-[200vh] ">
        <span className="font-bold">ภาพรวมยอดเงิน</span>
        <div className="flex  border-2 flex-1 ">
          <div className="flex flex-col gap-2 flex-1 p-2">
            <span>FIND Balance</span>
            <div className="flex gap-4">
              <span className="font-bold">฿ 20,542 </span>
              <button className="bg-red-500 w-20 rounded-md text-white">
                ถอนเงิน
              </button>
            </div>
          </div>

          {/* Blank */}
          <div className="flex flex-col p-2 gap-2 flex-1">
            <span>บัญชีธนาคารของฉัน</span>
            <div className="flex gap-2">
              <img src={blank} alt="blank" />
              <button>กสิกรไทย (Kbank) 491-30129-2</button>
            </div>
          </div>
        </div>

        {/* ภาพรวม */}
        <span className="font-bold">ภาพรวมรายรับของฉัน</span>
        <div className="gap-2 border p-2">
          <div className="flex justify-between items-end p-2">
            <div className="flex flex-col">
              <span className="font-bold">Pending</span>
              <span>รวม</span>
              <span className="font-bold">฿ 3,550 </span>
            </div>

            <div className="flex flex-col border-l pl-2">
              <span className="font-bold">โอนเงินแล้ว</span>
              <div className="flex flex-col">
              <span>สัปดาห์นี้</span>
              <span className="font-bold">฿ 13,240 </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span >เดือนนี้</span>
              <span className="font-bold">฿ 23,100 </span>
            </div>

            <div className="flex flex-col">
              <span >รวม</span>
              <span className="font-bold">฿ 68,792 </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
