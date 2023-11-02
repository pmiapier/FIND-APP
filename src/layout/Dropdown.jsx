import profile from '../images/profile.png';
export default function Dropdown() {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        USER
      </label>
      <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-black-100 rounded-box w-60 bg-white">
        <div className="flex gap-2 border-b p-2">
          <img src={profile} alt="profile" className="w-10 h-10" />
          <div className="flex flex-col ">
            <span>Supatipanno</span>
            <span>Supatipanno@gmail.com</span>
            <li>FIND point: 0</li>
          </div>
        </div>
        <li>
          <a href="/my-rental-items">My rental items</a>
        </li>
        <li>
          <a href="/my-rental-items">My rented items</a>
        </li>
        <li>
          <a href="/my-wallet">My account</a>
        </li>
        <li>
          <a href="/my-product">My products</a>
        </li>
        <li>
          <a href="/my-wallet">My wallet</a>
        </li>
        <li>
          <a href="#">My message</a>
        </li>
        <li>
          <a>Log out</a>
        </li>
      </ul>
    </div>
  );
}
