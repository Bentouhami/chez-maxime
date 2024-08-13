'use client';

import { Card } from "react-bootstrap";

const ProductCard = ({ product }: any) => {
    return (
        <Card>
            <Card.Img variant="top" src="https://placehold.co/600x400?text=produits+Maxime" alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Prix: {product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
