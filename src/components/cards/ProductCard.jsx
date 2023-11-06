import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
  console.log('item', item);
  const itemLink = `/single-product/${item.id}/`;
  return (
    <Link to={itemLink}>
      <div className="plant_product_card pb-2 rounded-[25px] w-full mt-2 border border-gray-200 overflow-hidden shadow h-fit">
        <div className="hover:scale-105">
          <img
            src={
              item.images?.[0]?.imageUrl ||
              'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            alt="product_img"
            className="object-cover w-full"
          />
        </div>
        <div className="space-y-7 p-3">
          <p className="font-semibold">{item.title}</p>
          <div className="flex justify-between items-center pb-4">
            <p className="text-xs text-gray-400">
              ฿{item.price}
              <span>&nbsp;/&nbsp;วัน</span>
            </p>
            <p className="text-xs text-gray-400">เขตราชเทวี</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
