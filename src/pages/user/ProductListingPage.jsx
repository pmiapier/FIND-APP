import ProductCard from '../../components/checkout/ProductCard';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import InputField from '../../components/inputs/InputField';
import Pagination from '../../components/others/Pagination';
import { useProduct } from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { FaSearch } from 'react-icons/fa';

export default function ProductListingPage() {
  const [product, setProduct] = useState([]);
  const [allPage, setAllPage] = useState();
  // const [page, setPage] = useState(1);
  // const [category, setCategory] = useState();

  const { categoryList, category, setCategory, page, setPage } = useProduct();
  const [countItems, setCountItems] = useState(1);

  let search = useLocation().search;
  // console.log(category);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePriceChange = (e) => {};
  const [searchItem, setSearchItem] = useState('');

  const handleInput = (e) => {
    setSearchItem(e.target.value);
  };
  let filterItem = [...product];

  if (searchItem) {
    filterItem = product.filter((el) => {
      if (el.title.toLowerCase().includes(searchItem.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    setSearchParams({ categories: category, page });
  }, [page, category]);
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const query = `/item/productListing${search}`;
      const res = await axios.get(query);
      setAllPage(Math.ceil(res.data.count._count?.id / 15));
      setProduct(res.data.item);
      setCountItems(res.data.count._count.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center bg-primaryBackground w-full font-bold h-[180px]">
        <h1 className="text-3xl ">{category}</h1>
      </div>

      <div className="px-[12rem]">
        <div className="flex space-x-4 space-y-4">
          <div className="h-fit w-3/12 p-4">
            <div className="border border-primaryGrayBorder p-4 rounded-md shadow space-y-4">
              <div className="flex items-center justify-center h-[45px] ">
                <input
                  className="w-full h-full p-3 border-2 border-gray-300"
                  placeholder="Search..."
                  onChange={handleInput}
                />
                <button className="w-[50px] h-full bg-gray-700 rounded-r-xl flex justify-center items-center">
                  <FaSearch className="text-white" />
                </button>
              </div>

              <p className="font-bold">Cagetory</p>
              <div className="pl-2">
                <ul className="space-y-1">
                  {categoryList.map((el, idx) => (
                    <li className="text-blue-500 hover:text-blue-900 hover:underline cursor-pointer" key={idx}>
                      <div
                        onClick={(e) => {
                          setPage(1);
                          setCategory(el);
                        }}
                      >
                        {el}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold">Search by Map</p>
                <InputField placeholder="Province Name" />
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
              {product ? filterItem.map((el, idx) => <ProductCard key={idx} item={el} />) : null}
            </div>
            <div className="flex justify-between">
              <p className="">
                Showing 1 to {countItems >= 15 ? 15 : countItems} of {countItems} results
              </p>
              <Pagination page={page} setPage={setPage} allPage={allPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
