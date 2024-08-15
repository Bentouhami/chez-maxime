// product api route : /api/products/:id

import { NextRequest, NextResponse } from 'next/server';
import { UpdateProductDto } from '@/utils/dtos';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';

interface Props {
    params: { id: string }
}

/**
 *  @method  GET
 *  @route   ~/api/products/:id
 *  @desc    Get Single Product By Id
 *  @access  public
 */
export async function GET(request: NextRequest, { params }: Props) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                category: true,  // Inclure les détails de la catégorie
                comments: {
                    include: {
                        user: {
                            select: {
                                email: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!product) {
            return NextResponse.json({ message: 'product not found' }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}

/**
 *  @method  PUT
 *  @route   ~/api/products/:id
 *  @desc    Update Product
 *  @access  private (only admin can update article)
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!product) {
            return NextResponse.json({ message: 'product not found' }, { status: 404 });
        }

        const body = (await request.json()) as UpdateProductDto;
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(params.id) },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                quantity: body.quantity,
                image: body.image,  // Ne pas mettre à jour si l'image n'est pas fournie
                categoryId: body.categoryId,
                bakery_id: body.bakery,  // Ne pas mettre à jour si bakery_id n'est pas fourni
            }
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}


/**
 *  @method  DELETE
 *  @route   ~/api/products/:id
 *  @desc    Delete Product
 *  @access  private (only admin can delete product)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            )
        }

        const article = await prisma.product.findUnique({
            where: { id: parseInt(params.id) },
            include: { comments: true }
        });
        if (!article) {
            return NextResponse.json({ message: 'article not found' }, { status: 404 });
        }

        // Deleting the article
        await prisma.product.delete({ where: { id: parseInt(params.id) } });

        // Deleting the comments that belong to this article
        const commentIds: number[] = article?.comments.map(comment => comment.id);
        await prisma.comment.deleteMany({
            where: { id: { in: commentIds }}
        });

        return NextResponse.json({ message: 'article deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}
