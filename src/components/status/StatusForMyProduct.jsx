const StatusForMyProduct = ({ text, className }) => {
  return (
    <div>
      <div className={className + ' px-5 py-2 rounded-md flex justify-center items-center w-44'}>{text}</div>
    </div>
  );
};

export default StatusForMyProduct;
