import { FaFacebook } from 'react-icons/fa6';
import { CiInstagram } from 'react-icons/Ci';
import { BsLine } from 'react-icons/bs';
import { IoLogoYoutube } from 'react-icons/Io';
import logo from '../images/FindLogo.png';

const Footer = () => {
  return (
    <footer className="w-full flex justify-center mt-16 mb-3 primaryBackground ">
      <div className="w-[1440px]">
        <div className="grid grid-cols-6">
          <div className="col-span-2 flex flex-col gap-2 justify-center items-center">
            <img className="w-[200px]" src={logo} />
            <div className="flex justify-around w-[30%]">
              <FaFacebook role='button' className="text-[25px] hover:text-gray-400" />
              <CiInstagram role='button' className="text-[25px] hover:text-gray-400" />
              <BsLine role='button' className="text-[25px] hover:text-gray-400" />
              <IoLogoYoutube role='button' className="text-[25px] hover:text-gray-400" />
            </div>
          </div>
          <div>
            <div className="font-bold">INFORMATION</div>
            <div role='button' className="hover:text-gray-400">About</div>
            <div role='button' className="hover:text-gray-400">FAQ</div>
            <div role='button' className="hover:text-gray-400">Contact Us</div>
          </div>
          <div>
            <div className="font-bold">LEGAL</div>
            <div role='button' className="hover:text-gray-400">Terms & Conditions</div>
            <div role='button' className="hover:text-gray-400">Privacy Policy</div>
            <div role='button' className="hover:text-gray-400">Withdrawal Policy</div>
          </div>
          <div>
            <div className="font-bold">SAFETY & SECURITY</div>
            <div role='button' className="hover:text-gray-400">About Verification</div>
            <div role='button' className="hover:text-gray-400">Security &  Policy</div>
          </div>
          <div>
            <div className="font-bold">STAY UP TO DATE</div>
            <div role='button' className="text-gray-400">Be the first to get the latest promotions, news and more</div>
          </div>
        </div>
        <hr className="mt-5 mb-2"></hr>
        <div className="w-full">
          <div className="flex justify-end pr-">
            <div className="text-sm text-gray-400 mb-1">@2023,all right seserverd,FIND</div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
