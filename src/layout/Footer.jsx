import { FaFacebook } from 'react-icons/fa6';
import { CiInstagram } from 'react-icons/Ci';
import { BsLine } from 'react-icons/bs';
import { IoLogoYoutube } from 'react-icons/Io';
import logo from '../../images/FindLogo.png';

const Footer = () => {
  return (
    <footer className="px-[176px]">
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <div className="pl-32 ">
            <img className="w-[130px]" src={logo} />
            <h1 className="font-black ">Lorem ipsum</h1>
          </div>
        </div>
        <div>
          <h1 className="font-black text-l">Footer Head #1</h1>
          <h6 className="text-gray-400">text link #1</h6>
          <h6 className="text-gray-400">text link #2</h6>
          <h6 className="text-gray-400">text link #3</h6>
          <h6 className="text-gray-400">text link #4</h6>
        </div>
        <div>
          <h1 className="font-black text-l">Footer Head #2</h1>
          <h6 className="text-gray-400">text link #1</h6>
          <h6 className="text-gray-400">text link #2</h6>
          <h6 className="text-gray-400">text link #3</h6>
          <h6 className="text-gray-400">text link #4</h6>
        </div>
        <div>
          <h1 className="font-black text-l">Footer Head #3</h1>
          <h6 className="text-gray-400">text link #1</h6>
          <h6 className="text-gray-400">text link #2</h6>
          <h6 className="text-gray-400">text link #3</h6>
          <h6 className="text-gray-400">text link #4</h6>
        </div>
        <div>
          <h1 className="font-black text-l">Footer Head #4</h1>
          <h6 className="text-gray-400">text link #1</h6>
          <h6 className="text-gray-400">text link #2</h6>
          <h6 className="text-gray-400">text link #3</h6>
          <h6 className="text-gray-400">text link #4</h6>
        </div>
      </div>
      <br></br>
      <div className="flex justify-center w-full">
        <hr className="w-[85%]  border "></hr>
      </div>
      <div className="flex justify-between pt-2 px-32 ">
        <div className="flex gap-4">
          <FaFacebook className="text-xl" />
          <CiInstagram className="text-xl" />
          <BsLine className="text-xl" />
          <IoLogoYoutube className="text-xl" />
        </div>
        <div>
          <h6 className="text-sm text-gray-400">@2023,all right seserverd,FIND</h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
