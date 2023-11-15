import { FaPencilAlt } from 'react-icons/fa';

const ButtonAccount = ({ text, className, icon, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={
          className +
          ' rounded-lg px-3 py-2 text-base flex gap-2 items-center justify-center text-black font-[700] cursor-pointer'
        }
      >
        {icon ? <FaPencilAlt /> : null}
        {text}
      </button>
    </div>
  );
};

export default ButtonAccount;
