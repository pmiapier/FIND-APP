import { FaArrowRight } from 'react-icons/fa';
import ItemStatus from '../status/ItemStatus';
import Button from '../buttons/Button';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';

export default function MyItemCard({ product, handleDeleteItem, handleEditItem }) {
  const { updateProductStatus } = useProduct();

  return (
    <div className="flex flex-col gap-4 bg-white shadow-lg px-5 py-5 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-lg font-bold">
          <ItemStatus
            text={
              product.status === 'available'
                ? 'พร้อมให้เช่า'
                : product.status === 'stock'
                ? 'ไม่แสดง'
                : product.status === 'renting'
                ? 'กำลังเช่า'
                : product.status === 'reserve'
                ? 'รอส่งสินค้า'
                : null
            }
            className={
              product.status === 'available'
                ? 'bg-readyToRent'
                : product.status === 'stock'
                ? 'bg-itemStock'
                : product.status === 'renting'
                ? 'bg-itemRenting'
                : product.status === 'reserve'
                ? 'bg-itemReserve'
                : null
            }
          />
          <ItemStatus text={`฿${product.price}`} className={'bg-itemPrice'} />
          <ItemStatus text={product.categories.name} className={'bg-itemCategory'} />
        </div>
        <FaRegTrashAlt onClick={() => handleDeleteItem(product.id)} className="cursor-pointer" />
      </div>

      <div className="flex gap-6 items-center">
        <div className="w-[180px] h-full">
          {product.images && product.images.length > 0 && (
            <img className="rounded-lg" src={product.images[0]?.imageUrl} alt="item" />
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-2xl font-bold line-clamp-2">{product.title}</div>
          <div className="flex gap-14">
            <div>Item ID</div> <div className="text-gray-400">{product.id}</div>
          </div>
          <div className="flex gap-6">
            <div>Last update</div>
            <div className="text-gray-400">
              {product.updatedAt ? (
                <span className="text-gray-400">
                  {new Date(product.updatedAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit'
                  })}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4">
              <Button
                text={'Edit Product'}
                className={'bg-[#808080] hover:bg-[#010101]'}
                icon={true}
                disabled={product.status === 'renting'}
                event={() => handleEditItem(product.id)}
              />

              {product.status === 'stock' ? (
                <Button
                  text={'Renew'}
                  className={'bg-[#808080] hover:bg-[#010101]'}
                  renew={true}
                  disabled={false}
                  event={async () => {
                    await updateProductStatus(product.id);
                  }}
                />
              ) : null}
            </div>

            <Link to={`/single-product/${product.id}`}>
              <div className="flex gap-2 items-center  text-viewProduct text-lg font-bold hover:underline cursor-pointer">
                View Product
                <span>
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
