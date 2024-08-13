// LoginForm.tsx : Composant React pour le formulaire de connexion

'use client';
import React from 'react'
import {Button} from "react-bootstrap";


// handelSubmit : fonction qui gère la soumission du formulaire de connexion (login) et qui envoie les données au serveur via l'API de l'utilisateur

const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
};
const LoginForm = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5 text-center w-100">
            <h1>Se connecter</h1><br/>
            <div className="container card bg-light show-form w-50 shadow-lg">
                <form className="card-body ">
                    <div className="mb-3">
                            <label htmlFor="username" className="form-label right-8 ">Nom d&apos;utilisateur</label>
                        <input type="text" className="form-control border-pink-500 border-3 " id="email" placeholder="Entrer votre email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control form-control border-pink-500 border-3" id="password" placeholder="Mot de passe"/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3 space-x-3"  >
                        <Button type="submit" className="btn btn-primary">Se connecter</Button>
                        <Button type="button" className="btn btn-secondary">S&apos;inscrire</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm
