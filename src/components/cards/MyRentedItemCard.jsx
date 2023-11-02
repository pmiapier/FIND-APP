import rentedItem from '../../assets/robert-bye.jpg';
import Button from '../buttons/Button';
import ItemStatus from '../status/ItemStatus';

export default function MyRentedItemCard() {
  return (
    <div className="bg-white flex justify-center items-center gap-10 py-5">
      <div className="w-60 h-40 overflow-hidden rounded-lg">
        <img className="rounded-sm" src={rentedItem} alt="item" />
      </div>

      <div className="py-5">
        <div>#orderNo</div>
        <div>Fjell Raven School Bag</div>

        <div className="flex gap-2">
          <div>Item ID</div>
          <div>1234XX</div>
        </div>
        <div>Item Status:</div>

        <ItemStatus text={'Renting'} className={'bg-[#FF7A00]'} />
        <div className="flex gap-2">
          <div>Item Owner:</div>
          <div>Pernille</div>
        </div>
      </div>

      <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg text-center ">
        <div>RENTAL START</div>
        <div className="text-gray-400">10-24-2023</div>
        <div>RENTAL ENDS</div>
        <div className="text-gray-400">10-31-2023</div>
      </div>

      <div className="bg-[#FF9900] text-white px-10 py-5 rounded-lg flex flex-col justify-center items-center ">
        <div>Must Return</div>
        <div>the item</div>
        <div>in</div>
        <div className="text-[30px]">2 days</div>
      </div>

      <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg ">
        <Button text={'Item Dispute'} className={'bg-messageButton hover:bg-hoverMessageButton w-full'} />
        <Button text={'Proof of Returning'} className={'bg-readyToRent hover:bg-green-700 w-full'} />
        <Button text={'Comfirm Return Item'} className={'bg-primaryButton hover:bg-hoverPrimaryButton w-full'} />
      </div>
    </div>
  );
}
