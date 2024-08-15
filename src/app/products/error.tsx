'use client';
import Link from "next/link";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ProductsErrorPage = ({ error, reset }: ErrorPageProps) => {
    return (
        <div className="fix-height pt-7 text-center">
            <p className="mb-2"> C&apos;est la page d&apos;erreur  pour les produits</p>
            <div className="text-3xl text-red-600 font-semibold">
                Il y a eu une erreur !
            </div>
            <h2 className="text-gray-700 my-3 text-xl">
                Error Message: {error.message}
            </h2>
            <button onClick={() => reset()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Essayez de nouveau
            </button>
            <Link className="text-xl underline text-blue-700 block mt-6" href='/'>
                Retourner à la page d&apos;accueil
            </Link>
        </div>
    )
}

export default ProductsErrorPage