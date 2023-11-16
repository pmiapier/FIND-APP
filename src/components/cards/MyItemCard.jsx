import { FaArrowRight } from 'react-icons/fa';
import Button from '../buttons/Button';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import StatusForMyProduct from '../status/StatusForMyProduct';

export default function MyItemCard({ product, handleDeleteItem, handleEditItem }) {
  const { updateProductStatus } = useProduct();

  return (
    <div className="flex flex-col gap-4 bg-white shadow-lg px-5 py-5 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-lg font-bold text-white">
          <StatusForMyProduct
            text={product?.status?.charAt(0).toUpperCase() + product?.status?.slice(1)}
            className={
              product.status === 'available'
                ? 'bg-readyToRent'
                : product.status === 'unavailable'
                ? 'bg-itemStock'
                : null
            }
          />
          <StatusForMyProduct text={`฿${product.price}`} className={'text-white bg-itemPrice '} />
          <StatusForMyProduct text={product.categories.name} className={'text-white bg-itemCategory'} />
        </div>
        <FaRegTrashAlt onClick={() => handleDeleteItem(product.id)} className="cursor-pointer" />
      </div>

      <div className="flex gap-6 items-center">
        <div className="w-[180px] h-[180px]">
          {product.images && product.images.length > 0 && (
            <img
              className="rounded-lg object-cover min-w-full min-h-full h-full"
              src={product.images[0]?.imageUrl}
              alt="item"
            />
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
                event={() => handleEditItem(product.id)}
              />

              {product.status === 'stock' ? (
                <Button
                  text={'Renew'}
                  className={'bg-[#808080] hover:bg-[#010101]'}
                  renew={true}
                  disabled={false}
                  event={() => {
                    updateProductStatus(product.id);
                    window.location.reload();
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
