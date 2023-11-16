import img from './img.png'
export default function AvatarInMessage({ setStatus }) {
    return (
        <div className="flex relative">
            <div className="h-[40px] w-[40px]  bg-red-500 rounded-full overflow-hidden">
                <img src={img} />
            </div>
            {/* {setStatus ? (
                <div className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0.5 right-0 h-2 w-2 md:h-3 md:w-3"></div>
            ) : (
                <div className="absolute block rounded-full bg-red-500 ring-2 ring-white top-0.5 right-0 h-2 w-2 md:h-3 md:w-3"></div>
            )} */}
        </div>
    )
}