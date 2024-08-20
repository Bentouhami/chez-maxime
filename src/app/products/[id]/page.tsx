// src/app/products/[id]/page.tsx (Client Component) pour la page d'un produit donné

import AddCommentForm from "@/ui/comments/AddCommentForm";
import CommentItem from "@/ui/comments/CommentItem";
import {cookies} from "next/headers";
import {verifyTokenForPage} from "@/utils/verifyToken";
import prisma from "@/utils/db";
import {redirect} from "next/navigation";
import {SingleProduct} from "@/utils/types";
import {Button} from "react-bootstrap";
import Link from "next/link";

interface SingleProductPageProps {
    params: { id: string }
}

const SingleProductPage = async ({params}: SingleProductPageProps) => {
    const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);

    //const product: SingleArticle = await getSingleArticle(params.id);

    // récupération du produit avec les commentaires
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
        <section className=" vh-100  container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                {/* ajouter une image de produit */}

                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {product.name} le prix:
                    {product.price.toFixed(2)}€
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
                    <div className="text-center">
                        <p className="text-blue-600 md:text-xl">
                            Vous devez vous connecter pour commenter.
                        </p>
                        <Link href="/login" passHref>
                            <Button variant="primary" className="mt-3 mb-5 bg-pink-500 border-0">
                                SE CONNECTER
                            </Button>
                        </Link>
                    </div>
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