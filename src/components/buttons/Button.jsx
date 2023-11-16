import { FaPencilAlt } from 'react-icons/fa';
import { CgNotes } from "react-icons/cg";
const Button = ({ text, className, icon, icon1, event, disabled }) => {
  return (
    <div className=''>
      <button
        className={
          className +
          ` rounded-lg px-3 py-2 text-base flex gap-2 items-center justify-center text-white font-[700] cursor-pointer ${disabled ? 'opacity-50' : ''
          }`
        }
        onClick={event}
        disabled={disabled}
      >
        <div className="flex gap-1 justify-center items-center">
          {icon ? <FaPencilAlt /> : null}
          {icon1 ? <CgNotes /> : null}
          {text}</div>

      </button>
    </div>
  );
};

export default Button;
