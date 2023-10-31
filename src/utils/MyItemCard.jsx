import { FaPencilAlt, FaArrowRight } from 'react-icons/fa';
export default function MyItemCard() {
  return (
    <div className='flex flex-col gap-4 bg-white shadow-lg px-5 py-5 '>
      <div className='flex gap-4 text-lg font-bold'>
        <div className='bg-readyToRent text-white bg-opacity-80 px-5 py-2 rounded-xl cursor-pointer hover:bg-[#2BF6B5]'>
          Ready for rent
        </div>
        <div className='bg-itemPrice text-white bg-opacity-80 px-5 py-2 rounded-xl cursor-pointer hover:bg-[#FF395D]'>
          ฿50
        </div>
        <div className='bg-itemCategory  text-white bg-opacity-80 px-5 py-2 rounded-xl cursor-pointer hover:bg-[#FA7A00]'>
          Clothing
        </div>
        <div className='bg-itemLocation  text-white bg-opacity-80 px-5 py-2 rounded-xl cursor-pointer hover:bg-[#3E8FFF]'>
          Phra Kanong
        </div>
      </div>

      <div className='flex gap-6 items-center'>
        <div>
          <img
            className='rounded-lg'
            src='https://via.placeholder.com/150'
            alt='item'
          />
        </div>
        <div className='flex flex-col gap-1 flex-1'>
          <div className='text-2xl font-bold line-clamp-2'>
            Fjell Raven School Bag. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Blanditiis quo perspiciatis nostrum rerum
            veritatis consequatur, nesciunt ipsa ex delectus exercitationem
            eveniet.
          </div>
          <div className='flex gap-14'>
            <div>Item ID</div> <div className='text-gray-400'>234567890</div>
          </div>
          <div className='flex gap-6'>
            <div>Last update</div>{' '}
            <div className='text-gray-400'>October 28, 2023- 18:49</div>
          </div>
          <div className='flex flex-1 justify-between'>
            <div className='flex gap-4'>
              <button
                className='flex items-center justify-center gap-4 bg-[#808080]
              text-white font-semibold text-lg px-4 py-2 rounded-xl cursor-pointer hover:bg-[#010101]'
              >
                <span>
                  <FaPencilAlt />
                </span>
                Edit Product
              </button>
              <button
                className='bg-[#808080]
              text-white font-semibold text-lg px-4 py-2 rounded-xl cursor-pointer hover:bg-[#010101]'
              >
                Renew
              </button>
            </div>

            <div className='flex gap-2 items-center  text-viewProduct text-lg font-bold hover:underline cursor-pointer'>
              View Product
              <span>
                <FaArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
