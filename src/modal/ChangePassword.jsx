import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword({ onClick }) {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePassword = async () => {
    await axios.patch('/auth/reset-password', password);

    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center backdrop-blur">
      <div className="w-[50vh] h-[50vh] p-8 rounded-md shadow-lg flex flex-col gap-8 mx-auto my-auto border-2 bg-white border-gray-300">
        <div className="text-3xl font-bold">Change password</div>

        <form className="flex flex-col gap-2">
          <label className="text-xl pl-2">Current Password</label>
          <input
            className="border-2 p-2 w-full"
            value={password?.password}
            // placeholder="Current Password"
            onChange={(e) =>
              setPassword((el) => ({
                ...el,
                password: e.target.value
              }))
            }
          ></input>
          <label className="text-xl pl-2">New Password</label>
          <input
            className="border-2 p-2 w-full"
            placeholder="New Password"
            id="password"
            type="password"
            value={password.newPassword}
            onChange={(e) => {
              setPassword((el) => ({
                ...el,
                newPassword: e.target.value
              }));
            }}
          ></input>
          <label className="text-xl pl-2">Confirm Password</label>
          <input
            className="border-2 p-2 w-full"
            placeholder="Confirm password"
            id="Confirmpassword"
            type="Confirmpassword"
            value={password.confirmPassword}
            onChange={(e) => {
              setPassword((el) => ({
                ...el,
                confirmPassword: e.target.value
              }));
            }}
          ></input>
        </form>

        <div className="flex justify-start gap-8">
          <button className="border p-2 rounded-md bg-blue-600 text-white px-8" onClick={handlePassword}>
            Save Change
          </button>
          <button className="border p-2 rounded-md font-semibold px-8" onClick={onClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
