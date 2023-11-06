import { FaPencilAlt } from 'react-icons/fa';

const Button = ({ text, className, icon ,event}) => {
  return (
    <div>
      <button
        className={
          className +
          ' rounded-lg px-3 py-2 text-base flex gap-2 items-center justify-center text-white font-[700] cursor-pointer'
        }
        onClick={event}
      >
        {icon ? <FaPencilAlt /> : null}
        {text}
      </button>
    </div>
  );
};

export default Button;
