// NosProduits.tsx : Composant React pour afficher les produits (Boulangerie (Pains blancs, Pains gris, Fine boulangerie, Viennoiserie) / Pâtisserie (Pâtisseries, Tartes, Fine pâtisserie, Chocolats, macarons et massepains, Gâteaux) / PIZZAS (Pizzas) /  Sandwichs  (Sandwichs garnis) / DIVERS ... )
'use client';
import React from 'react'

const NosProduits = () => {
    return (

        <div className="container mt-5 mb-5 text-center w-100">
            <h1>Nos produits</h1><br />
            <div className="container card bg-light show-form w-50 shadow-lg">
                <div className="card-body">
                    <h2>BOULANGERIE</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" src="https://picsum.photos/400/200" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Pains blancs</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <br />
                        <p>Et des produits plus spéciaux</p>
                        <ul>
                            <li>Pains gris</li>
                            <li>Fine boulangerie</li>
                            <li>Viennoiserie</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NosProduits
