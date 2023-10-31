import { useModal } from '../hooks/useModal';
import { FcGoogle } from 'react-icons/fc';
import { BiLogoFacebook } from 'react-icons/bi';
import Logo from '../images/imgRegister.png'

export default function RegisterModal() {
    const { onCloseModal, isOpenModal, modalType } = useModal()
    return (<>
        {isOpenModal && modalType === "registerModal" && (
            <div className='fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50'>
                <div className="relative flex flex-col items-center justify-center h-[800px] w-[1400px] drop-shadow-2xl  bg-white">
                    <button onClick={onCloseModal} className=" text-white absolute top-4 right-4 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full " >
                        X
                    </button>
                    <div className="flex w-full h-full">
                        <img src={Logo} className="w-[50%]" />
                        <div className="flex flex-col items-center w-[50%] h-full p-10 pt-[80px]">
                            <div className="flex flex-col justify-start w-full">
                                <div className="text-[40px]  font-bold">สมัครสมาชิก</div>
                                <div className="flex gap-1 ">
                                    <div className="">เป็นสมาชิกอยู่แล้ว?</div>
                                    <div className="text-blue-600 font-bold hover:cursor-pointer">เข้าสู่ระบบ</div>
                                </div>
                            </div>
                            <div className="flex gap-5 h-[60px] pt-[80px] w-full">
                                <button className="flex justify-center gap-4 items-center bg-gray-300 h-[60px] w-[50%] rounded-full">
                                    <FcGoogle className=' h-[45px] w-[45px]' />
                                    <button className="col-span-8">CONTINUE WITH GOOGLE</button>
                                </button>
                                <button className="flex justify-center gap-4 items-center bg-blue-500 h-[60px] w-[50%] rounded-full">
                                    <BiLogoFacebook className='text-white col-span-2 h-[45px] w-[45px]' />
                                    <button className=" text-white">CONTINUE WITH FACEBOOK</button>
                                </button>
                            </div>
                            <div className="mt-[100px] mb-[20px] w-[50%] relative flex   h-px place-items-center bg-gray-300">
                                <div className="absolute left-1/2 h-5 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">หรือ</div>
                            </div>
                            <form className="w-[90%]">
                                <div className="flex gap-7">
                                    <div className="relative z-0 w-full mb-6 flex-1 group">
                                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute -z-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 flex-1 group">
                                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute -z-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surname</label>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="email" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label className="peer-focus:font-medium absolute -z-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="phonenumber" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label className="peer-focus:font-medium absolute -z-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>
                                <div className="relative w-full flex mb-6 items-center group">
                                    <input type="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label className=" peer-focus:font-medium absolute -z-20 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                                <div className="relative w-full flex mb-6 items-center group">
                                    <input type="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label className=" peer-focus:font-medium absolute -z-20 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                                </div>
                                <button className="px-4 py-2 my-2 w-[30%] bg-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:bg-gray-100 hover:text-blue-500 text-white rounded-lg text-[20px]">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    </>)
}






