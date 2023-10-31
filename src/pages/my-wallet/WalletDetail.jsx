import WalletDetailItem from "./WalletDetailItem";

export default function WalletDetail() {
  return (
    <div className="flex flex-col border p-4 w-[200vh]">
      <div className="font-bold">รายละเอียดรายรับของฉัน</div>
      <div className="flex justify-between bg-gray-200 p-2">
        <span className="flex flex-1 font-bold">เลขที่ออเดอร์</span>
        <span className="flex flex-1 font-bold">วันที่ทำการโอนเงิน</span>
        <span className="flex flex-1 font-bold">สถานะ</span>
        <span className="flex flex-1 font-bold">จำนวนเงินที่ได้รับ</span>
        <span className="flex flex-1 font-bold">ค่าธรรมเนียม</span>
      </div>
      <div>
        <WalletDetailItem />
        <WalletDetailItem />
        <WalletDetailItem />
      </div>
    </div>
  );
}
