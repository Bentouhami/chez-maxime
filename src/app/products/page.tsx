// src/app/products/page.tsx (Client Component) pour la page des produits
import type { Metadata } from 'next';
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import {Product} from "@prisma/client";
import prisma from "@/utils/db";
import {getProducts} from "@/apiCalls/productApiCall";
import SearchProductInput from "@/ui/products/SearchProductInput";
import ProductItem from "@/ui/products/ProductItem";
import Pagination from "@/ui/products/Pagination";

interface ProductsPageProps {
  searchParams: { pageNumber: string }
}

const ProductsPage = async ({ searchParams } : ProductsPageProps) => {
    const pageNumber = searchParams.pageNumber || "1"; // Default to page 1 if undefined
    const products: Product[] = await getProducts(pageNumber);
    const count: number = await prisma.product.count();

    const pages = Math.ceil(count / PRODUCT_PER_PAGE);

    return (
        <section className="container m-auto px-5">
            <SearchProductInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {products.map(item => (
                    <ProductItem product={item} key={item.id} />
                ))}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} route="/products" pages={pages} />
        </section>
    );
};


export default ProductsPage;

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'Les Produits de chez maxime',
}