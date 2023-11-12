const ItemStatus = ({ text, className }) => {
  return (
    <div>
      <div className={className + ' border border-orange px-5 py-2 rounded-md flex justify-center items-center w-48 '}>
        {text}
      </div>
    </div>
  );
};

export default ItemStatus;
