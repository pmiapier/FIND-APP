const Input = ({ type = "text", className = "", event, text = "ใส่prop text ด้วย", placeholder }) => {
    return (
        <div className="flex flex-col gap-2">
            <div>{text}</div>
            <input
                className={className +
                    "  border-b-2 outline-none border-[E4E6E3] pl-1 pb-2 1000 duration-1000 focus:border-black"}
                type={type}
                onChange={event}
                placeholder={placeholder}
            />
        </div>

    );
};

export default Input;