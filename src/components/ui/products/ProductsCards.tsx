'use client';

import {Button, Card} from "react-bootstrap";

const ProductCard = ({product}: any) => {
    return (
        <Card>
            <Card.Img variant="top" src="https://placehold.co/600x400?text=produits+Maxime" alt={product.name}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>

                <label className="form-label">Quantité</label>
                <input type="number" className="form-control form-control border-pink-300 border-3" id="quantity"
                       placeholder="Saisir la quantité ici"/>

            </Card.Body>
            <Card.Footer className={`d-flex justify-content-between align-items-center`}>
                <Button className="btn btn-primary bg-pink-700 border-0" >Ajouter au panier</Button>
                <label className="">{product.price}</label>

            </Card.Footer>
        </Card>
    );
}

export default ProductCard;
