import { FaMapMarkedAlt, FaSearch, FaRegUserCircle, FaRegCommentAlt, FaBars } from 'react-icons/fa';
import logo from '../images/FindLogo.png';
import { useModal } from '../hooks/useModal';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { onOpenModal } = useModal();
  const { authUser } = useAuth();
  return (
    <div className=" flex justify-center items-center w-full h-[85px] bg-white drop-shadow-xl">
      <div className="flex justify-evenly items-center gap-[100px] w-full">
        <Link to="/">
          <img src={logo} className="w-[130px]" />
        </Link>
        {/* <div className="flex items-center justify-center h-[45px] w-[670px]">
          <button className="w-[150px] h-full bg-gray-700 rounded-l-xl flex justify-center items-center gap-2">
            <FaMapMarkedAlt className="text-white" />
            <div className=" text-white">ค้นหาด้วยแผนที่</div>
          </button>
          <input className="w-[470px] h-full p-3 border-y-2 border-gray-300" placeholder="ค้นหาสินค้า..." />
          <button className="w-[50px] h-full bg-gray-700 rounded-r-xl flex justify-center items-center">
            <FaSearch className="text-white" />
          </button>
        </div> */}
        <div className="flex items-center justify-center gap-5">
          <Link to="/product-listing">
            <div className="flex justify-center items-center gap-1">
              <FaBars />
              หมวดหมู่สินค้า
            </div>
          </Link>
          <Link to="/Chat">
            <div className="hover:cursor-pointer flex justify-center items-center gap-1">
              <FaRegCommentAlt />
              ข้อความ
            </div>
          </Link>
          {authUser ? (
            ''
          ) : (
            <div
              onClick={() => onOpenModal('loginModal')}
              className="hover:cursor-pointer flex justify-center items-center gap-1"
            >
              <FaRegUserCircle />
              เข้าสู่ระบบ
            </div>
          )}
          {authUser ? <Dropdown /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Header;
