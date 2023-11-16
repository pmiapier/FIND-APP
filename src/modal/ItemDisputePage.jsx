import { BsFillTelephoneFill } from 'react-icons/bs';
import { useModal } from '../hooks/useModal';

export default function ItemDisputePage() {
  const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal();
  return (
    <>
      {isOpenModal && modalType === "itemDisputeModal" && (
        <div className="fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50 rounded-2xl">
          <div className="relative flex flex-col items-center justify-center h-[300px] w-[800px] drop-shadow-2xl  bg-white  rounded-2xl">
            <button
              onClick={onCloseModal}
              className=" text-white absolute top-4 right-4 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full "
            >
              X
            </button>
            < div className="flex justify-center items-center">
              <div className="bg-white flex flex-col justify-center ">
                <div>In case of any disagreements, promptly reach out to the support center</div>
                <BsFillTelephoneFill />
                <div>Phone Number</div>
                <div>+66 90 897 56 23</div>
                <div>Email</div>
                <div>supportcenter@find.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>)

}
