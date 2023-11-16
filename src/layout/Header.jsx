import { FaRegUserCircle, FaRegCommentAlt, FaBars } from 'react-icons/fa';
import logo from '../images/FindLogo.png';
import { useModal } from '../hooks/useModal';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DropdownMegaMenu from './DropdownMegaMenu';

const Header = () => {
  const { onOpenModal } = useModal();
  const { authUser } = useAuth();
  return (
    <div className=" flex justify-center items-center w-full h-[85px] bg-white drop-shadow-xl">
      <div className="flex justify-between px-[170px] items-center w-full">
        <Link to="/">
          <img src={logo} className="w-[160px]" />
        </Link>
        <div className="flex items-center justify-center gap-5">
          <Link to="/product-listing">
            <DropdownMegaMenu logo={<FaBars />} text="Category" className="" />
          </Link>
          <div
            onClick={() => onOpenModal('chatModal')}
            className="hover:cursor-pointer flex justify-center items-center gap-1"
          >
            <FaRegCommentAlt />
            Message
          </div>
          {authUser ? (
            ''
          ) : (
            <div
              onClick={() => onOpenModal('loginModal')}
              className="hover:cursor-pointer flex justify-center items-center gap-1"
            >
              <FaRegUserCircle />
              Login
            </div>
          )}
          {authUser ? <Dropdown /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Header;
