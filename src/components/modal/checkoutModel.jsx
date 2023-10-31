import { useModal } from '../../Hooks/useModal';
import { FcGoogle } from 'react-icons/fc';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { BiLogoFacebook } from 'react-icons/bi';
import Logo from '../../images/imgLogo.png'
import { useState } from 'react';
export default function CheckoutModel() {
    const { onCloseModal, isOpenModal, modalType, onOpenModal } = useModal()
    return (<>
        {isOpenModal && modalType === "checkoutModal" && (
            <div className='fixed bottom-0 left-0 flex justify-center items-center h-full w-full backdrop-blur z-50'>
                <div className="relative flex items-center justify-center h-[450px] w-[1200px] drop-shadow-2xl rounded-lg bg-white">
                    <button onClick={onCloseModal} className=" text-white absolute top-4 right-4 bg-gray-300 border-2 hover:text-gray-500 hover:bg-white hover:border-gray-500 w-8 h-8 flex justify-center items-center rounded-full " >
                        X
                    </button>
                    <div className="h-full w-[50%] p-10">
                        <div className="text-[30px] font-semibold mb-1">กระเป๋าสะพาย แบรนด์ KANKEN</div>
                        <div className="flex w-full h-full">
                            <div className="flex-1 w-[50%] h-[80%] "></div>
                            <div className="flex flex-col w-[50%] justify-between h-[80%] ">
                                <div className="">
                                    <div className="text-[20px] h-[15px]">ราคาค่าเช่า</div>
                                    <div className="flex items-end">
                                        <div className="text-[50px] h-[60px]">฿50</div>
                                        <div className="">/วัน</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="">สถานะสินค้า</div>
                                        <div className="">พร้อมให้เช่า</div>
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="flex justify-between">
                                        <div className="">รหัสสินค้า</div>
                                        <div className="">1934134</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">เจ้าของสินค้า</div>
                                        <div className="">Patipano N</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full w-[50%] pt-[80px] px-10">
                        <div className="flex w-full gap-7 mb-5">
                            <div className="w-full">
                                <div className="pb-1 font-semibold">วันที่รับสินค้า</div>
                                <input type='date' className='p-2 w-full rounded-lg border-2' ></input>
                            </div>
                            <div className="w-full">
                                <div className="pb-1 font-semibold">วันที่รับสินค้า</div>
                                <input type='date' className='p-2 w-full rounded-lg border-2' ></input>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mb-5 w-full">
                            <div className="flex w-full justify-between ">
                                <div className="">จำนวนวันในการเช่า</div>
                                <div className="">8 วัน</div>
                            </div>
                            <div className="flex w-full justify-between ">
                                <div className="">ราคา</div>
                                <div className="">฿2,000</div>
                            </div>
                            <div className="flex w-full justify-between ">
                                <div className="">มัดจำ</div>
                                <div className="">฿600</div>
                            </div>
                            <div className="flex w-full justify-between ">
                                <div className="">รวมทั้งหมด</div>
                                <div className="">฿2,600</div>
                            </div>
                        </div>
                        <div className="flex">
                            <input type='checkbox' className="" />
                            <div className="text-[13px] pl-1">ยอมรับเงื่อนไขและข้อตกลงในการเช่าสินค้ากับ FIND อ่านเงื่อนไขและข้อตกลงเพิ่มเติมได้</div>
                            <div className="text-[13px] pl-1 font-semibold text-sky-500">ที่นี่</div>
                        </div>
                        <button className="px-4 py-2 my-2 w-full bg-sky-500 border-2 border-sky-500 hover:border-sky-500 hover:bg-gray-100 hover:text-sky-500 text-white rounded-lg ">ยืนยันและชำระเงิน</button>
                    </div>
                </div>
            </div>
        )
        }
    </>)
}







