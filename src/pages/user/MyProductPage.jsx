import MyItemCard from '../../components/cards/MyItemCard';
import { useModal } from '../../hooks/useModal';
import AddItemModal from '../../modal/AddItemModal';

export default function MyProductPage() {
  const { onOpenModal } = useModal();
  return (
    <div className="flex flex-col bg-primaryBackground px-10 py-10 gap-10">
      <div className="text-lg">You have 8 items in total</div>
      <div
        onClick={() => onOpenModal('AddItemModal')}
        className="flex gap-5 justify-start items-center bg-white px-5 py-5 shadow-lg cursor-pointer"
      >
        <div className=" flex text-5xl font-thin text-red-700 pb-[10px]">+</div>
        <div className="text-2xl">Add new item</div>
      </div>

      <div className="grid grid-cols-2 gap-6 justify-around">
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
        <MyItemCard />
      </div>
      <AddItemModal />
    </div>
  );
}
