// RegisterForm.tsx : Composant React pour le formulaire de connexion

'use client';


import React from "react";
import {Button} from "react-bootstrap";

const RegisterForm = () => {
    return (
        // register form Address email, mot de passe, confirm mot de passe, prénom, nom numéro de téléphone

        <div className="container p-5 mt-5 mb-5 text-center w-100">
            <h1>S&apos;inscrire</h1><br/>
            <div className="container card bg-light show-form w-50 shadow-lg">
                <form className="card-body ">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label right-8 ">ADDRESSE EMAIL</label>
                        <input type="email" className="form-control border-pink-500 border-3 " id="email"
                               placeholder="Saisir votre adresse email ici"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">MOT DE PASSE</label>
                        <input type="password" className="form-control form-control border-pink-500 border-3"
                               id="password" placeholder="Saisir votre mot de passe ici"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">CONFIRMER MOT DE PASSE</label>
                        <input type="password" className="form-control form-control border-pink-500 border-3"
                               id="password" placeholder="Confirmer votre mot de passe ici"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">PRÉNOM</label>
                        <input type="text" className="form-control form-control border-pink-500 border-3"
                               id="text" placeholder="Saisir votre prénom ici"/>
                    </div>
                    <div className="mb-3">

                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">NOM</label>
                            <input type="text" className="form-control form-control border-pink-500 border-3"
                                   id="text" placeholder="Saisir votre nom ici"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">NUMÉRO DE TELÉPHONE</label>
                            <input type="text" className="form-control form-control border-pink-500 border-3"
                                   id="number" placeholder="Numéro de téléphone"/>
                        </div>
                        <div >
                            <Button type="submit" className="btn btn-primary">S&apos;inscrire</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterForm
