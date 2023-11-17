import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
  const itemLink = `/single-product/${item.id}/`;
  console.log(item)
  return (
    <Link to={itemLink}>
      <div className="w-[350px] plant_product_card pb-2 rounded-[25px]  mt-2 border border-gray-200 overflow-hidden shadow h-fit">
        <div className="hover:scale-105 overflow-hidden">
          <img
            src={
              item.images?.[0]?.imageUrl ||
              'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            alt="product_img"
            className="object-cover w-full h-[400px]"
          />
        </div>
        <div className=" h-[80px] p-4">
          <p className="font-bold text-[20px]">{item.title}</p>
          <div className="flex justify-between items-center pb-4">
            <p className="text-[15px] text-blue-400">
              ฿ {item.price}
              <span className=" text-gray-500">&nbsp;/&nbsp;Day</span>
            </p>
            {/* <p className="text-xs text-gray-400">Ratchathewi District</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
