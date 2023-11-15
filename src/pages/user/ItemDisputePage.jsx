import { BsFillTelephoneFill } from 'react-icons/bs';

export default function ItemDisputePage() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center border border-gray-100 w-96">
        <div>In case of any disagreements, promptly reach out to the support center</div>
        <div>
          <BsFillTelephoneFill />
        </div>
        <div>Phone Number</div>
        <div>+66 90 897 56 23</div>
        <div>Email</div>
        <div>supportcenter@find.com</div>
      </div>
    </div>
  );
}
