import { Link } from "react-router-dom";

export default function ProductCard() {
  return (
    <Link to="#">
      <div className="plant_product_card pb-2 rounded-[25px] w-full mt-2 border border-gray-200 overflow-hidden shadow h-fit">
        <div className="hover:scale-105">
          <img
            src="https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="product_img"
            className="object-cover w-full"
          />
        </div>
        <div className="space-y-7 p-3">
          <p className="font-semibold">
            Lorem ipsum dolor sit amet anadask babaconsectetur adipisicing
            elit...
          </p>
          <div className="flex justify-between items-center pb-4">
            <p className="text-xs text-gray-400">
              ฿175<span>&nbsp;/&nbsp;วัน</span>
            </p>
            <p className="text-xs text-gray-400">เขตราชเทวี</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
