// src/app/products/subcategories/page.tsx (Client Component) pour la page des produits par sous-catégorie

import type { Metadata } from 'next';
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { Product } from "@prisma/client";
import prisma from "@/utils/db";
import ProductItem from "@/ui/products/ProductItem";
import Pagination from "@/ui/products/Pagination";
import { useSearchParams } from 'next/navigation';

interface ProductsBySubcategoryPageProps {
    searchParams: { pageNumber: string, subcategoryId: string }
}

const ProductsBySubcategoryPage = async ({ searchParams }: ProductsBySubcategoryPageProps) => {
    const pageNumber = searchParams.pageNumber || "1"; // Default to page 1 if undefined
    const subcategoryId = searchParams.subcategoryId;

    // Fetch products by subcategory
    const products: Product[] = await prisma.product.findMany({
        where: { categoryId: parseInt(subcategoryId) },
        skip: (parseInt(pageNumber) - 1) * PRODUCT_PER_PAGE,
        take: PRODUCT_PER_PAGE,
    });

    // Count the total number of products for this subcategory
    const count: number = await prisma.product.count({
        where: { categoryId: parseInt(subcategoryId) },
    });

    const pages = Math.ceil(count / PRODUCT_PER_PAGE);

    return (
        <section className="container m-auto px-5">
            <div className="flex items-center justify-center flex-wrap gap-7">
                {products.length > 0 ? (
                    products.map(item => (
                        <ProductItem product={item} key={item.id} />
                    ))
                ) : (
                    <p>No products available for this subcategory.</p>
                )}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} route="/products/subcategories" pages={pages} />
        </section>
    );
};

export default ProductsBySubcategoryPage;

export const metadata: Metadata = {
    title: 'Products by Subcategory',
    description: 'Les produits par sous-catégorie de chez maxime',
};
