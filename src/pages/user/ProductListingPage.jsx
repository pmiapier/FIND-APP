import ProductCard from '../../components/cards/ProductCard';
import { Link } from 'react-router-dom';
import InputField from '../../components/inputs/InputField';
import Pagination from '../../components/others/Pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProduct';

const categoryList = [
  'Sport',
  'Electronics',
  'Appliances',
  'Tools',
  'Baby',
  'Books',
  'Camping',
  'Hiking',
  'Clothing',
  'Vehicles'
];

export default function ProductListingPage() {
  const { items } = useProduct();

  // const [items, setItems] = useState([]); // [{}
  // TODO: Need pagination
  // const getItems = () => {
  //   axios.get('/item').then((response) => {
  //     console.log(response.data);
  //     setItems(response.data);
  //   });
  // };

  // useEffect(() => {
  //   getItems();
  // }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-primaryBackground w-full font-bold text-3xl h-[180px]">
        <h1>YOUR CATEGORY NAME HERE</h1>
      </div>
      <div className="px-[12rem]">
        <div className="flex space-x-4 space-y-4">
          <div className="h-fit w-3/12 p-4">
            <div className="border border-primaryGrayBorder p-4 rounded-md shadow space-y-4">
              <div className="space-y-2">
                <p className="font-bold">ราคาเช่าต่อวัน</p>
                <input type="range" min={0} max="100" value="40" className="range range-accent range-xs" />
                <div className="flex justify-between text-xs">
                  <p>
                    ราคา:<span> ฿0 - ฿20,000</span>
                  </p>
                  <p className="cursor-pointer">ค้นหา</p>
                </div>
              </div>
              <p className="font-bold">หมวดหมู่สินค้า</p>
              <div className="pl-2">
                <ul className="space-y-1">
                  {categoryList.map((el, idx) => (
                    <li className="text-blue-500 hover:text-blue-900 hover:underline" key={idx}>
                      <Link to="#">{el}</Link>
                      <span className="text-xs p-1 text-gray-500">(147)</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold">ค้นหาด้วยแผนที่</p>
                <InputField placeholder="ชื่อจังหวัด" />
                <div className="h-fit">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.345362105068!2d100.53391947114345!3d13.758034698476852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29eca0a4dc2e7%3A0x944f80c1e57b451e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Lij4Lij4LiT4Liq4Lij4LiT4LmM!5e0!3m2!1sth!2sth!4v1698815423097!5m2!1sth!2sth"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {items.map((el, idx) => (
                <ProductCard key={idx} item={el} />
              ))}
            </div>
            <div className="flex justify-between">
              <p className="">Showing 1 to 12 of 17 results</p>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
