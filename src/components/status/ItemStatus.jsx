const ItemStatus = ({ text, className }) => {
  return (
    <div>
      <div
        className={
          className +
          ' text-white bg-opacity-80 px-5 py-2 rounded-lg flex justify-center items-center '
        }
      >
        {text}
      </div>
    </div>
  );
};

export default ItemStatus;
