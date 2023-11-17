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
    <>
      <div className="flex gap-10 justify-center items-center py-20 bg-white">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-bold">Welcome to the FIND Account Center</h1>
          <img className="" src={detailImage}></img>
        </div>
        <div className="bg-white rounded-lg px-10 py-10 shadow-lg">
          <div className="flex justify-between gap-20">
            <div className="flex">
              <h2 className="font-bold text-xl pb-6">You account details</h2>
            </div>
            <div className="flex gap-2 items-center">
              <img src={pointIcon} className="w-[24px] h-[24px] mt-[3px]"></img>
              <h6> {authUser?.point} FIND POINT</h6>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-10">
              <div>Name</div>
              <h4>
                {authUser?.firstName} {authUser?.lastName}
              </h4>
            </div>
            <div className="flex gap-10">
              <div className="font-bold">Email</div>
              <h4 className="inline">{authUser?.email}</h4>
            </div>
            <div className="flex gap-6">
              <div>Contact</div>
              <h4>{authUser?.phoneNumber}</h4>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <ButtonAccount
              onClick={() => setModalOpen(true)}
              text={'Edit details'}
              className={'border border-1 border-black w-full'}
            />
            <ButtonAccount
              onClick={() => setModalOpen2(true)}
              text={'Change password'}
              className={'border border-1 border-black w-full'}
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
    </>
  );
}
