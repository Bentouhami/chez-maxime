// Admin Products Table Page : /admin/products-table

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {verifyTokenForPage} from "@/utils/verifyToken";
import {PRODUCT_PER_PAGE} from "@/utils/constants";
import {Product} from "@prisma/client";
import Link from "next/link";
import {getProducts} from '@/apiCalls/productApiCall';
import prisma from "@/utils/db";
import Pagination from "@/components/ui/products/Pagination";
import DeleteProductButton from "./DeleteProductButton";

interface AdminProductsTableProps{
    searchParams: { pageNumber: string };
}

const AdminProductsTable = async ({searchParams: {pageNumber}}: AdminProductsTableProps) => {
    const token = cookies().get("jwtToken")?.value;
    if (!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");

    const products: Product[] = await getProducts(pageNumber);
    const count: number = await prisma.product.count();
    const pages = Math.ceil(count / PRODUCT_PER_PAGE);


    return (
        <section className="p-5">
            <h1 className="mb-7 text-2xl font-semibold text-gray-700">Products</h1>
            <table className="table w-full text-left">
                <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
                <tr>
                    <th className="p-1 lg:p-2">Title</th>
                    <th className="hidden lg:inline-block lg:p-2">Created At</th>
                    <th>Actions</th>
                    <th className="hidden lg:inline-block"></th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id} className="border-b border-t border-gray-300">
                        <td className="p-3 text-gray-700">{product.name}</td>
                        <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                            {new Date(product.createdAt).toDateString()}
                        </td>
                        <td className="p-3">
                            <Link
                                href={`/admin/products-table/edit/${product.id}`}
                                className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                            >
                                Edit
                            </Link>
                            <DeleteProductButton productId={product.id}/>
                        </td>
                        <td className="hidden lg:inline-block p-3">
                            <Link
                                href={`/products/${product.id}`}
                                className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                            >
                                Read More
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={parseInt(pageNumber)}
                pages={pages}
                route="/admin/products-table"
            />
        </section>
    )
}

export default AdminProductsTable