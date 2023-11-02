import MyRentedItemCard from '../../components/cards/MyRentedItemCard';

export default function MyRentedItemsPage() {
  return (
    <div className="bg-primaryBackground px-20 py-5 ">
      <div className="text-[30px]">My Rented Items การเช่าของฉัน</div>
      <div className="flex flex-col gap-5">
        <MyRentedItemCard />
        <MyRentedItemCard />
        <MyRentedItemCard />
      </div>
    </div>
  );
}
