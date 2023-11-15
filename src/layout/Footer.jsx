import facebookIcon from '../assets/Footer/Facebook.svg';
import instagramIcon from '../assets/Footer/Instagram.svg';
import linkedInIcon from '../assets/Footer/LinkedIn.svg';
import findLogo from '../images/FindLogo.png';

export default function Footer() {
  return (
    <div className="flex flex-col w-[100vw] h-[50px]">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center justify-center w-[180px] mr-32 ml-64">
          <img src={findLogo}></img>
          <h1 className="font-black text-1 text-center">Lorem ipsum</h1>
        </div>
        <div className="flex pr-[500px] gap-24">
          <div className="flex flex-col gap-3">
            <h1 className="font-black text-l w-54">Footer Head#1</h1>
            <h6 className="text-gray-400">text link#1</h6>
            <h6 className="text-gray-400">text link#2</h6>
            <h6 className="text-gray-400">text link#3</h6>
            <h6 className="text-gray-400">text link#4</h6>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-black text-l w-54">Footer Head#2</h1>
            <h6 className="text-gray-400">text link#1</h6>
            <h6 className="text-gray-400">text link#2</h6>
            <h6 className="text-gray-400">text link#3</h6>
            <h6 className="text-gray-400">text link#4</h6>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-black text-l w-54">Footer Head#3</h1>
            <h6 className="text-gray-400">text link#1</h6>
            <h6 className="text-gray-400">text link#2</h6>
            <h6 className="text-gray-400">text link#3</h6>
            <h6 className="text-gray-400">text link#4</h6>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-black text-l w-54">Footer Head#4</h1>
            <h6 className="text-gray-400">text link#1</h6>
            <h6 className="text-gray-400">text link#2</h6>
            <h6 className="text-gray-400">text link#3</h6>
            <h6 className="text-gray-400">text link#4</h6>
          </div>
        </div>
      </div>
      <hr className="border-1 text-gray-50 mt-8 mx-64" />
      <div className="flex justify-between px-20 mt-5">
        <div className="flex gap-4">
          <img className='w-[50px]' src={facebookIcon} />
          <img className='w-[50px]' src={instagramIcon} />
          <img className='w-[50px]' src={linkedInIcon} />
        </div>
        <div>
          <h6 className="text-gray-400 mr-48">@2023. all rights reserverd,FIND</h6>
        </div>
      </div>
    </div>
  );
}
