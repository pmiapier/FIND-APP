import MyItemCard from '../../utils/MyItemCard';

export default function MyProductPage() {
  return (
    <div className='flex flex-col bg-primaryBackground px-10 py-10 gap-10'>
      <div className='text-lg'>You have 8 items in total</div>
      <div className='flex gap-5 justify-start items-center bg-white px-5 py-5 shadow-lg'>
        <div className=' flex text-5xl font-thin text-red-700 pb-[10px]'>+</div>
        <div className='text-2xl'>Add new item</div>
      </div>

      <div className='grid grid-cols-2 gap-6 justify-around'>
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
      </div>
    </div>
  );
}
