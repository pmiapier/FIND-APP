import MyRentalItemCard from '../../components/cards/MyRentalItemCard';

export default function MyRentalItemsPage() {
  return (
    <div className='bg-primaryBackground px-20 py-5'>
      <div className='text-[30px]'>My Rental Items</div>
      <div className='flex flex-col gap-5'>
        <MyRentalItemCard />
        <MyRentalItemCard />
        <MyRentalItemCard />
      </div>
    </div>
  );
}
