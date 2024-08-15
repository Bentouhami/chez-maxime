import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';


/**
 *  @method  GET
 *  @route   ~/api/articles/search?searchText=value
 *  @desc    Get Articles By Search Text
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let products;
        if (searchText) {
            products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            products = await prisma.product.findMany({ take: 6 });
        }

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}