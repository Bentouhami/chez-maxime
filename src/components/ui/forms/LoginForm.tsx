// LoginForm.tsx : Composant React pour le formulaire de connexion

'use client';
import React from 'react'

const LoginForm = () => {
    return (
        <div className="container p-5 mt-5 mb-5 text-center w-100">
            <h1>Se connecter</h1><br/>
            <div className="container card bg-light show-form w-50 shadow-lg">
                <form className="card-body ">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label right-8 ">Nom d'utilisateur</label>
                        <input type="text" className="form-control border-pink-500 border-3 " id="email" placeholder="Entrer votre email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control form-control border-pink-500 border-3" id="password" placeholder="Mot de passe"/>
                    </div>
                    <div className="container d-grid gap-2 small">
                        <button type="submit" className="btn btn-primary">Se connecter</button>
                        <button type="button" className="btn btn-secondary">S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm
