export default function InputFromUser({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  name,
  hasError,
  label,
  limitText
}) {
  return (
    <>
      <label htmlFor="" className="font-bold">
        {label}
        <input
          type={type}
          placeholder={placeholder}
          className={`
                 ${className} ${
            hasError
              ? 'border-red-500 focus: ring-red-300'
              : 'focus:ring-blue-300 focus:border-blue-300 border-gray-300'
          }`}
          value={value}
          onChange={onChange}
          name={name}
          maxLength={limitText}
        />
        <div className="text-xs py-2 h-4 flex justify-between ">
          <div>{hasError && <p className="text-red-500">Helper message</p>}</div>
          <div>
            {limitText && (
              <p className="text-gray-400">
                <span>{value.length ?? 0}</span>&nbsp;/&nbsp;
                <span>{limitText}</span>
              </p>
            )}
          </div>
        </div>
      </label>
    </>
  );
}
