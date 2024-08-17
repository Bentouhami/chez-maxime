// ProductItem.tsx component  /components/ui/products/ProductItem.tsx

import Link from "next/link";
import Image from "next/image";
import { Product } from '@prisma/client';

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    // Default image to be used if product.image is not available
    // const defaultImage = "https://placehold.co/400";
    const defaultImage = "https://www.langelys.com/wp-content/uploads/2022/01/Violette-grand.png";

    return (
        <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4">
            <Link href={`/products/${product.id}`} passHref>
                <div className="flex justify-center mb-4">
                    {/*TODO: Add a loading state for the image fix cloudinary*/}
                    <Image
                        src={product.image || defaultImage}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="rounded-lg"
                        style={{ objectFit: 'cover' }} // Use style prop instead of objectFit
                    />
                </div>
            </Link>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                {product.name}
            </h3>
            <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                {product.description}
            </p>
            <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
                {product.price.toString()} €
            </p>
            <Link
                className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg"
                href={`/products/${product.id}`}
            >
                Read More
            </Link>
        </div>
    );
};

export default ProductItem;
