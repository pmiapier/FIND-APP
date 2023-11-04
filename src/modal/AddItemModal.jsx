import { useModal } from '../hooks/useModal';
import UserAddProduct from '../components/items/UserAddProduct';

const category = [`Vehicles`, `Electronic`, `Tools`, `Appliances`, `Hiking`, `Sport`, `Clothing`, `baby`, `Books`];

export default function AddItemModal() {
  const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
  return (
    <>
      {isOpenModal && modalType === 'AddItemModal' && (
        <div>
          <div className="bg-gray-900 fixed inset-0 bg-opacity-40 z-20"></div>
          <div className="fixed inset-0 z-30">
            <div className="flex justify-center items-center min-h-full ">
              <UserAddProduct category={category} onCloseModal={onCloseModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
