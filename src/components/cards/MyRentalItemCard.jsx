export default function MyRentalItemCard() {
  return (
    <div className='bg-white flex gap-10'>
      <div className=''>
        <img
          className='rounded-lg'
          src='https://via.placeholder.com/150'
          alt='item'
        />
      </div>
      <div className='flex'>
        <div className='py-5'>
          <div>#orderNo</div>
          <div>Fjell Raven School Bag</div>
          <div className='flex gap-2'>
            <div>Item ID</div>
            <div>1234XX</div>
          </div>
          <div>Item Status</div>
          <button className='bg-[#FF7A00] px-3'>Renting</button>
          <div className='flex gap-2'>
            <div>Item Owner</div>
            <div>Pernille</div>
          </div>
        </div>

        <div className='border-2 border-gray-100 flex flex-col gap-1 px-10 py-5 rounded-lg text-center '>
          <div>RENTAL START</div>
          <div className='text-gray-400'>10-24-2023</div>
          <div>RENTAL ENDS</div>
          <div className='text-gray-400'>10-31-2023</div>
        </div>
      </div>
    </div>
  );
}
