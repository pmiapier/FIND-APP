import { AiFillBook } from 'react-icons/ai';
import { BsDatabaseFill, BsCarFrontFill, BsTools } from 'react-icons/bs';
import { FaCampground, FaVolleyballBall, FaVideo, FaBlogger, FaHiking, FaTransgenderAlt } from 'react-icons/fa';

export default function DropdownMegaMenu({ logo, text }) {
  return (
    <div className="dropdown dropdown-bottom ">
      <label tabIndex={0} className="">
        <div className="flex justify-center items-center gap-1">
          {logo} {text}
        </div>
      </label>

      <div tabIndex={0} className="dropdown-content  bg-white rounded-box w-96  flex flex-col gap-4 pl-4 py-5">
        <div className="flex gap-16 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaCampground />
              <h5>Camping</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <AiFillBook />
              <h5>Book</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaVolleyballBall />
              <h5>Sport</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaVideo />
              <h5>Electronic</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <BsDatabaseFill />
              <h5>Appliances</h5>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <BsTools />
              <h5>Tools</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaBlogger />
              <h5>Baby</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaHiking />
              <h5>Hiking</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <FaTransgenderAlt />
              <h5>Clothing</h5>
            </div>
            <div className="flex flex-row gap-4 items-center hover:text-blue-500">
              <BsCarFrontFill />
              <h5>Vehicle</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
