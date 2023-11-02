import { FaArrowRight } from 'react-icons/fa';
import ItemStatus from '../status/ItemStatus';
import Button from '../buttons/Button';

export default function MyItemCard() {
  return (
    <div className="flex flex-col gap-4 bg-white shadow-lg px-5 py-5 ">
      <div className="flex gap-4 text-lg font-bold">
        <ItemStatus text={' Ready for rent'} className={'bg-readyToRent'} />
        <ItemStatus text={'฿50'} className={'bg-itemPrice'} />
        <ItemStatus text={'Clothing'} className={'bg-itemCategory'} />
        <ItemStatus text={'Phra Kanong'} className={'bg-itemLocation '} />
      </div>

      <div className="flex gap-6 items-center">
        <div>
          <img className="rounded-lg" src="https://via.placeholder.com/150" alt="item" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-2xl font-bold line-clamp-2">
            Fjell Raven School Bag. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quo
            perspiciatis nostrum rerum veritatis consequatur, nesciunt ipsa ex delectus exercitationem eveniet.
          </div>
          <div className="flex gap-14">
            <div>Item ID</div> <div className="text-gray-400">234567890</div>
          </div>
          <div className="flex gap-6">
            <div>Last update</div> <div className="text-gray-400">October 28, 2023- 18:49</div>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4">
              <Button text={'Edit Product'} className={'bg-[#808080] hover:bg-[#010101]'} icon={true} />
              <Button text={'Renew'} className={'bg-[#808080] hover:bg-[#010101]'} />
            </div>

            <div className="flex gap-2 items-center  text-viewProduct text-lg font-bold hover:underline cursor-pointer">
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
