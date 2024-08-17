import { getProductsBasedOnSearch } from '@/apiCalls/productApiCall';
import { Product } from '@prisma/client';
import ProductItem from "@/ui/products/ProductItem";

interface SearchProductPageProps {
  searchParams: { searchText: string };
}

const SearchProductPage = async ({ searchParams: { searchText } }: SearchProductPageProps) => {
  const products: Product[] = await getProductsBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {products.length === 0 ? (
        <h2 className='text-gray-800 text-2xl font-bold p-5'>
          Products based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Products based on
            <span className='ms-1 text-green-700 text-3xl font-bold'>{searchText}</span>
          </h1>
          <div className='flex items-center justify-center flex-wrap gap-7'>
            {products.map(item => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default SearchProductPage