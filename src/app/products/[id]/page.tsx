//import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/ui/comments/AddCommentForm";
import CommentItem from "@/components/ui/comments/CommentItem";
import {cookies} from "next/headers";
import {verifyTokenForPage} from "@/utils/verifyToken";
import prisma from "@/utils/db";
import {redirect} from "next/navigation";
import {SingleProduct} from "@/utils/types";

interface SingleProductPageProps {
    params: { id: string }
}

const SingleProductPage = async ({params}: SingleProductPageProps) => {
    const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);

    //const product: SingleArticle = await getSingleArticle(params.id);

    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
        include: {
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
        }
    }) as SingleProduct;

    if (!product) {
        console.log("product not found");
        // return  NextResponse.json({message: "product not found"}, {status: 404});
        redirect("/not-found");
    }

    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {product.name}
                </h1>
                <div className="text-gray-400">
                    {new Date(product.createdAt).toDateString()}
                </div>
                <p className="text-gray-800 text-xl mt-5">{product.description}</p>
            </div>
            <div className="mt-7">
                {payload ? (
                    <AddCommentForm productId={product.id}/>
                ) : (
                    <p className="text-blue-600 md:text-xl">
                        to write a comment you should log in first
                    </p>
                )}
            </div>
            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
                Comments
            </h4>
            {product.comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} userId={payload?.id}/>
            ))}
        </section>
    )
}

export default SingleProductPage;