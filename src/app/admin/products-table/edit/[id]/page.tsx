
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Product } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {getSingleProduct} from "@/apiCalls/productApiCall";
import EditProductForm from "@/app/admin/products-table/edit/[id]/EditProductForm";



interface EditArticlePageProps {
    params: { id: string };
}

const EditArticlePage = async ({ params } : EditArticlePageProps) => {
    const token = cookies().get("jwtToken")?.value;
    if (!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");

    const product: Product = await getSingleProduct(params.id);


    return (
        <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
            <div className='shadow p-4 bg-purple-200 rounded w-full'>
                <h2 className='text-2xl text-green-700 font-semibold mb-4'>
                    Edit Article
                </h2>
                <EditProductForm product={product} />
            </div>
        </section>
    )
}

export default EditArticlePage