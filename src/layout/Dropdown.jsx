import { useAuth } from '../hooks/useAuth';
// import pointIcon from '../../assets/account-detail/pointIcon.svg';
import pointIcon from '../assets/account-detail/pointIcon.svg';
import profile from '../images/profile.png';
export default function Dropdown() {
  const { authUser, logout } = useAuth();
  // Render loading state or null if the user information is not yet available
  if (!authUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="dropdown ">
      <label tabIndex={0} className="btn m-1  ">
        {authUser.firstName}
      </label>
      <ul tabIndex={0} className="dropdown-content border menu p-2 shadow bg-black-100 rounded-box w-60 bg-white">
        <div className="flex gap-2 justify-center border-b p-2">
          <img src={authUser.profileImg || profile} alt="profile" className="w-10 h-10" />
          <div className="flex flex-col justify-center">
            <span className=' font-bold text-[20px]' >{authUser.firstName}</span>
            <span className='text-[12px]'>{authUser.email}</span>
            <div className="flex justify-center items-center gap-2 mb-1">
              {/* <img src={pointIcon} className="w-[16px] h-[16px] "></img> */}
              {/* <li>FIND point: {authUser.point || 0}</li> */}
            </div>
          </div>
        </div>
        <li className='my-1'>
          <a className='hover:font-bold' href="/my-rental-items">My rental items</a>
        </li>
        <li>
          <a className='hover:font-bold' href="/my-rented-items">My rented items</a>
        </li>
        <li>
          <a className='hover:font-bold' href="/myaccount">My account</a>
        </li>
        <li>
          <a className='hover:font-bold' href="/my-product">My products</a>
        </li>
        <li>
          <a className='hover:font-bold' href="/my-wallet">My wallet</a>
        </li>

        <li onClick={logout}>
          <a className='hover:font-bold' href="/">Log out</a>
        </li>
      </ul>
    </div>
  );
}
