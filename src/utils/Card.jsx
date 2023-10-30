const Card = ({ data }) => {
    return (
        <div>
            <div className="flex flex-col rounded-2xl justify-between pb-5 h-[426px] w-[285px] border border-black">
                <img className="h-[297px] rounded-2xl" src={data.img} />
                <div className="px-5">
                    <div className="font-semibold">{data.title} <span className="font-normal">{data.description}</span></div>

                </div>
                <div className="flex justify-between text-[E4E6E3] px-5 text-[12px]">
                    <div>{data.price} </div>
                    <div>{data.location}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;