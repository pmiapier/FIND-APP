import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from '../config/axios';

export default function UpdateUserModel({ onClick }) {
  const { authUser, setAuthUser } = useAuth();

  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [Email, setemail] = useState('');
  const [Phonenumber, setphonenumber] = useState('');

  const handleUpdate = async () => {
    const editUser = {
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      phoneNumber: authUser.phoneNumber,
      email: authUser.email
    };
    await axios.patch(`/user/updateUser/${authUser.id}`, editUser);
    onClick();
  };


  return (
    <div className="h-screen flex flex-col items-center justify-center backdrop-blur ">
      <div className="w-[50vh] p-8 shadow-lg flex flex-col gap-8 mx-auto my-auto border-2 bg-white border-gray-300 rounded-3xl">
        <div className="text-2xl font-bold">Account Details</div>
        <form className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <div>
              <label>First Name</label>
              <input
                className="border-2 rounded-md  w-full p-1"
                value={authUser?.firstName}
                onChange={(e) =>
                  setAuthUser((el) => ({
                    ...el,
                    firstName: e.target.value
                  }))
                }
              ></input>
            </div>
            <div>
              <label>Last Name</label>
              <input
                className="border-2 rounded-md w-full p-1"
                value={authUser?.lastName}
                onChange={(e) =>
                  setAuthUser((el) => ({
                    ...el,
                    lastName: e.target.value
                  }))
                }
              ></input>
            </div>
          </div>

          <div>
            <div className="">
              <label className="">Email</label>
              <input
                className="border-2 w-full block rounded-md p-1"
                value={authUser?.email}
                onChange={(e) =>
                  setAuthUser((el) => ({
                    ...el,
                    email: e.target.value
                  }))
                }
              ></input>
            </div>
            <div className="flex justify-between text-[12px]">
              <h6>Helper Message</h6>
              <h6>0/20</h6>
            </div>
          </div>

          <div>
            <div>
              <label className="">Contact</label>
              <input
                className="border-2 w-full block rounded-md p-1"
                value={authUser?.phoneNumber}
                onChange={(e) =>
                  setAuthUser((el) => ({
                    ...el,
                    phoneNumber: e.target.value
                  }))
                }
              ></input>
            </div>
            <div className="flex justify-between text-[12px]">
              <h6>Helper Message</h6>
              <h6>0/20</h6>
            </div>
          </div>
          <div></div>
        </form>

        <div className="flex justify-start gap-3">
          <button className="border p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-8 hover:font-extrabold" onClick={handleUpdate}>
            Save Change
          </button>
          <button className="border p-2 rounded-md font-semibold px-8 hover:bg-red-400 hover:text-white" onClick={onClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
