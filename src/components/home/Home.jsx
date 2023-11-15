import { useEffect, useState } from "react";
import one from "../../images/1.png";
import two from "../../images/2.png";
import three from "../../images/3.png";
import four from "../../images/4.png";
import col21 from "../../images/col21.png";
import col22 from "../../images/col22.png";
import col23 from "../../images/col23.png";
import col24 from "../../images/col24.png";
import col25 from "../../images/col25.png";
import col26 from "../../images/col26.png";
import axios from "../../config/axios";
import ProductCard from "../cards/ProductCard";

const Home = () => {
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    getAllItem();
  }, []);

  console.log(allItem);
  const getAllItem = async () => {
    const data = await axios
      .get("/item")
      .then((res) => setAllItem(res.data))
      .catch((error) => console.log(error));
    return data;
  };
  return (
    <div className="mx-auto grid w-5/6 gap-4">
      <div className="grid grid-cols-2 ">
        <img src={one} className="w-full" />
        <div className="grid grid-cols-2 gap-4">
          <img src={two} className="w-full h-full" />
          <div className="grid gap-4">
            <img src={three} className="w-full" />
            <img src={four} className="w-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <img src={col21} className="w-full" />
          <img src={col22} className="w-full" />
          <img src={col23} className="w-full" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <img src={col24} className="w-full" />
          <img src={col25} className="w-full" />
          <img src={col26} className="w-full" />
        </div>
      </div>

      <div className="font-extrabold text-lg pl-4">
        รายการแน่ะนำสำหรับคุณโดยเฉพาะ
      </div>

      <div className="grid grid-cols-4 gap-4 mt-2">
        {allItem.map((el) => (
          <ProductCard key={el.id} item={el} />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="grid grid-cols-2 border-2 rounded-xl p-4">
          <div className="">
            <p className="text-[32px] font-bold"> 4,787</p>
          </div>
          <div className="flex gap-1 flex-col">
            <p className="text-[16px] text-green-700">+187</p>
            <p className="text-[11px]">จากสัปดาห์ที่แล้ว</p>
          </div>
          <div>
            <p className="font-bold"> จำนวนสมาชิกของ FIND</p>
          </div>
        </div>
        <div className="grid grid-cols-2 border-2 rounded-xl p-4">
          <div className="">
            <p className="text-[32px] font-bold"> 4,787</p>
          </div>
          <div className="flex gap-1 flex-col">
            <p className="text-[16px] text-green-700">+187</p>
            <p className="text-[11px]">จากสัปดาห์ที่แล้ว</p>
          </div>
          <div>
            <p className="font-bold"> จำนวนสมาชิกของ FIND</p>
          </div>
        </div>

        <div className="flex font-semibold col-span-2 border-2 rounded-lg">
          <div className="w-[60%] p-10 text-2xl">
            <h1>มีสินค้าที่ไม่ค่อยได้ใช้ แต่ไม่อยากขาย?</h1>
            <h1>สร้างรายได้กับเรา</h1>
          </div>
          <div className="w-[40%] ">
            <div className="bg-red-600 rounded-lg text-white h-full flex justify-center items-center">
              <h1 className="">คลิกเพื่อปล่อยเช่าสินค้าของคุณ</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
