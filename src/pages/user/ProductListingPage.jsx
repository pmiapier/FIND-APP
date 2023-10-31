import ProductCard from '../../components/cards/ProductCard';

export default function ProductListingPage() {
  return (
    <div>
      This is a product Listing
      <div className='grid grid-cols-4 gap-4 px-4'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
