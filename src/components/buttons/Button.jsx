import { FaPencilAlt } from 'react-icons/fa';

const Button = ({ text, className, icon }) => {
  return (
    <div>
      <button
        className={
          className +
          ' rounded-lg px-3 py-2 text-base flex gap-2 items-center text-white font-[700] cursor-pointer'
        }
      >
        {icon ? <FaPencilAlt /> : null}
        {text}
      </button>
    </div>
  );
};

export default Button;
