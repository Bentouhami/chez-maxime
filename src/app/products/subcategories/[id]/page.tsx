// src/app/products/subcategories/[id]/page.tsx

import type { Metadata } from 'next';
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { Product } from "@prisma/client";
import prisma from "@/utils/db";
import SearchProductInput from "@/ui/products/SearchProductInput";
import ProductItem from "@/ui/products/ProductItem";
import Pagination from "@/ui/products/Pagination";

interface SubcategoryProductsPageProps {
    params: { id: string };
    searchParams: { pageNumber: string };
}

const SubcategoryProductsPage = async ({ params, searchParams }: SubcategoryProductsPageProps) => {
    const subCategoryId = parseInt(params.id);
    const pageNumber = searchParams.pageNumber || "1"; // Default to page 1 if undefined

    // Fetch products by subcategory ID
    const products: Product[] = await prisma.product.findMany({
        where: {
            categoryId: subCategoryId,
        },
        skip: (parseInt(pageNumber) - 1) * PRODUCT_PER_PAGE,
        take: PRODUCT_PER_PAGE,
    });

    // Count the total number of products in this subcategory
    const count: number = await prisma.product.count({
        where: {
            categoryId: subCategoryId,
        },
    });

    const pages = Math.ceil(count / PRODUCT_PER_PAGE);

    return (
        <section className="container m-auto px-5">
            <SearchProductInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {products.map(item => (
                    <ProductItem product={item} key={item.id} />
                ))}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} route={`/products/subcategories/${subCategoryId}`} pages={pages} />
        </section>
    );
};

export default SubcategoryProductsPage;

export const metadata: Metadata = {
    title: 'Products by Subcategory',
    description: 'Les produits filtrés par sous-catégorie',
};
