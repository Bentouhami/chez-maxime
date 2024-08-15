// product api route : /api/products
import {NextRequest, NextResponse} from 'next/server';
import {createProductSchema} from '@/utils/validationSchemas';
import {CreateProductDto} from '@/utils/dtos';
import prisma from '@/utils/db';
import {PRODUCT_PER_PAGE} from '@/utils/constants';
import {verifyToken} from '@/utils/verifyToken';
import {Product} from "@prisma/client";

/**
 *  @method  GET
 *  @route   ~/api/products
 *  @desc    Get Products By Page Number
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = parseInt(request.nextUrl.searchParams.get("pageNumber") || "1");
        console.log(`Fetching products for page: ${pageNumber}`);

        if (isNaN(pageNumber) || pageNumber < 1) {
            return NextResponse.json(
                { message: "Invalid page number" },
                { status: 400 }
            );
        }

        const products = await prisma.product.findMany({
            skip: PRODUCT_PER_PAGE * (pageNumber - 1),
            take: PRODUCT_PER_PAGE,
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Fetched products:`, products);
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}


/**
 *  @method  POST
 *  @route   ~/api/products
 *  @desc    Create New Product
 *  @access  private (only admin can create product)
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                {message: 'only admin, access denied'},
                {status: 403}
            );
        }

        const body = (await request.json()) as CreateProductDto;
        console.log("Received product data:", body);

        const validation = createProductSchema.safeParse(body);
        if (!validation.success) {
            console.log("Validation error:", validation.error.errors[0].message);
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }

        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                quantity: body.quantity,
                image: body.image || null,  // Utiliser `null` si aucune image n'est fournie
                categoryId: body.categoryId,
                bakery_id: body.bakery || null,  // Utiliser `null` si aucune boulangerie n'est fournie
            }
        });

        console.log("Created new product:", newProduct);
        return NextResponse.json(newProduct, {status: 201});
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        );
    }
}
