import { useEffect, useState } from 'react';
import one from '../../images/1.png';
import two from '../../images/2.png';
import three from '../../images/3.png';
import four from '../../images/4.png';
import col21 from '../../images/col21.png';
import col22 from '../../images/col22.png';
import col23 from '../../images/col23.png';
import col24 from '../../images/col24.png';
import col25 from '../../images/col25.png';
import col26 from '../../images/col26.png';
import axios from '../../config/axios';
import ProductCard from '../checkout/ProductCard';
import { Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const Home = () => {
  const [allItem, setAllItem] = useState([]);
  const { category, setCategory } = useProduct()

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    const data = await axios
      .get('/item')
      .then((res) => setAllItem(res.data))
      .catch((error) => console.log(error));
    return data;
  };
  return (
    <div className="mx-auto grid w-5/6 gap-2 mt-8">
      <div className="grid grid-cols-2 ">
        <Link to={`/product-listing`} onClick={() => setCategory(`sport`)}>
          <img src={one} className="w-full" />
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/product-listing`} onClick={() => setCategory(`Electronics`)} >
            <img src={two} className="w-full h-full" />
          </Link>
          <div className="grid gap-2">
            <Link to={`/product-listing`} onClick={() => setCategory(`Appliances`)}>
              <img src={three} className="w-full" />
            </Link>
            <Link to={`/product-listing`} onClick={() => setCategory(`Tools`)}>
              <img src={four} className="w-full" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-3 gap-2">
          <Link to={`/product-listing`} onClick={() => setCategory(`Baby`)}>
            <img src={col21} className="w-full" />
          </Link>
          <Link to={`/product-listing`} onClick={() => setCategory(`Books`)}>
            <img src={col22} className="w-full" />
          </Link>
          <Link to={`/product-listing`} onClick={() => setCategory(`Camping`)}>
            <img src={col23} className="w-full" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Link to={`/product-listing`} onClick={() => setCategory(`Hiking`)}>
            <img src={col24} className="w-full" />
          </Link>
          <Link to={`/product-listing`} onClick={() => setCategory(`Clothing`)}>
            <img src={col25} className="w-full" />
          </Link>
          <Link to={`/product-listing`} onClick={() => setCategory(`Vehicles`)}>
            <img src={col26} className="w-full" />
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex gap-5 justify-start items-center bg-green-400 w-full rounded-xl px-5 py-5 shadow-lg">
          <div className="text-[40px] font-extrabold text-white">Recommended Items</div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <div className="w-[90%] grid grid-cols-5 gap-4 mt-2">
          {allItem.map((el) => (
            <ProductCard key={el.id} item={el} />
          ))}</div>
      </div> */}
      <Swiper
        slidesPerView={3.95}
        spaceBetween={5}
        navigation={true}

        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className=" w-[1500px] mb-5"
      >
        {allItem.map((el) => (
          <SwiperSlide >
            <ProductCard key={el.id} item={el} />
          </SwiperSlide >
        ))}
      </Swiper>
      <div className="grid grid-cols-4 h-[190px] gap-3 mb-6">
        <div className=" border-2 relative rounded-xl ">
          <div className=" absolute left-[40px] bottom-[47px] text-[100px] font-bold text-green-400">+31</div>
          <div className=" absolute right-[40px] bottom-[60px] text-[60px] ">Today</div>
          <div className=" absolute left-[70px] bottom-8 text-[30px] font-bold"> Our FIND Member</div>
        </div>
        <div className=" border-2 relative rounded-xl ">
          <div className=" absolute left-[85px] bottom-[55px] text-[100px] font-bold text-yellow-400">+228</div>
          <div className=" absolute right-[80px] bottom-[30px] text-[50px] ">Last week</div>
          <div className=" absolute left-[120px] bottom-4 text-[20px] font-bold"> Our FIND Member</div>
        </div>
        <div className="flex font-semibold col-span-2 border-2 border-red-600 rounded-xl">
          <div className="w-[60%] p-10 text-2xl">
            <h1>No need to buy, No need to sell,</h1>
            <h1>start making profit out of your items with FIND</h1>
          </div>
          <div className="w-[40%] ">
            <div className="bg-red-600 rounded-r-lg text-white  h-full flex justify-center items-center">
              <h1 className="text-[23px] ">Begin Your Rental Journey.</h1>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
