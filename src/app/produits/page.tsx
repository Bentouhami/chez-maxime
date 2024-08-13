import Link from "next/link";
import { Button } from "react-bootstrap";
import ProductListWithPagination from "@/components/ui/products/ProductListWithPagination";

const ProduitsPage = () => {
    const products = [
        { id: 1, name: "Pain Traditionnel", price: "€2.50" },
        { id: 2, name: "Croissant au Beurre", price: "€1.20" },
        { id: 3, name: "Baguette", price: "€1.00" },
        { id: 4, name: "Éclair au Chocolat", price: "€3.00" },
        { id: 5, name: "Tarte aux Fraises", price: "€4.50" },
        { id: 6, name: "Pain aux Noix", price: "€2.80" },
        { id: 7, name: "Pain de Seigle", price: "€3.00" },
        { id: 8, name: "Pain Complet", price: "€2.60" },
        { id: 9, name: "Brioche", price: "€3.50" },
        { id: 10, name: "Chausson aux Pommes", price: "€2.00" },
        { id: 11, name: "Galette des Rois", price: "€7.50" },
        { id: 12, name: "Pain aux Raisins", price: "€2.30" }
    ];

    return (
        <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center my-5">
                <div className="text-center order-2 order-md-1">
                    <h1 className="card-title">
                        Bienvenue chez Maxime, votre boulangerie. Voici les produits que nous proposons.
                    </h1>

                    <ProductListWithPagination products={products} />

                    <Link href="/login" passHref>
                        <Button variant="primary" className="mt-3 mb-5">Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProduitsPage;
