import Button from '../buttons/Button';
import ItemStatus from '../status/ItemStatus';
import item from '../../assets/jamesunsplash.jpg';

export default function MyRentalItemCard({data}) {
  // console.log(data.createdAt.getHours());
  const startRentDate = `${new Date(data.startRentDate).getDate()}-${new Date(data.startRentDate).getMonth()}-${new Date(data.startRentDate).getFullYear()}`
  const endRentDate = `${new Date(data.endRentDate).getDate()}-${new Date(data.endRentDate).getMonth()}-${new Date(data.endRentDate).getFullYear()}`
  const diffDate = (new Date(data.startRentDate)- new Date(data.endRentDate));
  return (
    <div className="bg-white flex justify-center items-center gap-5 py-5">
      <div className="w-60 h-40 overflow-hidden rounded-lg">
        <img className="rounded-sm" src={data.item.images[0].imageUrl} alt="item" />
      </div>

      <div className="py-5">
        <div>#orderNo</div>
        <div>{data.item.title}</div>
        <div className="flex gap-2">
          <div>Item ID</div>
          <div>{data.item.id}</div>
        </div>
        <div>Item Status:</div>
        <ItemStatus text={data.status} className={'bg-[#FF7A00]'} />
        <div className="flex gap-2">
          <div>Item Owner</div>
          <div>{data.owner.firstName}</div>
        </div>
      </div>

      <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg text-center ">
        <div>RENTAL START</div>
        <div className="text-gray-400">{startRentDate}</div>
        <div>RENTAL ENDS</div>
        <div className="text-gray-400">{endRentDate}</div>
      </div>

      <div className="bg-[#FF9900] text-white px-10 py-5 rounded-lg flex flex-col justify-center items-center ">
        <div>Expect returning in</div>
        <div className="text-[30px]">{diffDate} days</div>
        <div>Returning Date</div>
        <div>10-31-2023</div>
      </div>

      <div className="border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg text-center">
        <div className="flex justify-between">
          <div>rental price</div>
          <div>฿{data.item.price}</div>
        </div>

        <div className="flex justify-between">
          <div>Deposite</div>
          <div>฿{data.deposit}</div>
        </div>

        <div className="flex justify-between">
          <div>Total</div>
          <div>฿{data.amount}</div>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <Button text={'Send Message '} className={'bg-messageButton hover:bg-hoverMessageButton'} />
          <Button text={'Comfirm Receive Item'} className={'bg-primaryButton hover:bg-hoverPrimaryButton'} />
        </div>
      </div>
    </div>
  );
}
