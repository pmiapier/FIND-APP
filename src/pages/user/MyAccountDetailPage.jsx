import detailImage from '../../assets/account-detail/Account 1.svg';
import pointIcon from '../../assets/account-detail/pointIcon.svg';
import { useAuth } from '../../hooks/useAuth';
import ButtonAccount from '../../components/buttons/ButtonAccount';
import { useEffect, useState } from 'react';
import UpdateUserModel from '../../modal/UpdateUserModal';
import ChangePassword from '../../modal/ChangePassword';

export default function MyAccountDetailPage() {
  const { authUser } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  return (
    <div className='w-full flex justify-center items-center'>
      <div className=" w-full justify-center items-center py-10 bg-white">
        <h1 className="w-full  flex justify-center items-center text-[50px] font-bold">Welcome to the FIND Account Center</h1>
        <div className="w-full  flex justify-center items-center gap-[100px] mt-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <img className="w-[400px]" src={detailImage}></img>
          </div>
          <div className="bg-white rounded-2xl w-[500px] px-10 py-10 shadow-2xl border border-gray-100">
            <div className="flex justify-between gap-20">
              <div className="flex">
                <div className="font-bold text-[40px] pb-6">You account details</div>
              </div>
              {/* <div className="flex gap-2 items-center">
                <img src={pointIcon} className="w-[24px] h-[24px] mt-[3px]"></img>
                <h6> {authUser?.point} FIND POINT</h6>
              </div> */}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex  gap-10">
                <div className='font-bold'>Name :</div>
                <div>
                  {authUser?.firstName} {authUser?.lastName}
                </div>
              </div>
              <div className="flex gap-10">
                <div className="font-bold">Email :</div>
                <div className="inline">{authUser?.email}</div>
              </div>
              <div className="flex gap-6">
                <div className='font-bold'>Contact :</div>
                <div>{authUser?.phoneNumber}</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <ButtonAccount
                onClick={() => setModalOpen(true)}
                text={'Edit details'}
                className={'border border-1 border-black w-full hover:bg-gray-300 '}
              />
              <ButtonAccount
                onClick={() => setModalOpen2(true)}
                text={'Change password'}
                className={'border border-1 border-black w-full hover:bg-gray-300 '}
              />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <UpdateUserModel onClick={() => setModalOpen(false)} />
          </div>
        )}

        {isModalOpen2 && (
          <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <ChangePassword onClick={() => setModalOpen2(false)} />
          </div>
        )}
      </div> </div>
  );
}
