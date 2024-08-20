// LoginForm.tsx : Composant React pour le formulaire de connexion
'use client';
import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useRouter} from "next/navigation";
import {loginSchema} from "@/utils/validationSchemas";
import {Slide, toast, ToastContainer} from "react-toastify";
import {LoginUserDto} from "@/utils/dtos";
import axios from "axios"; // Import correct pour Next.js 13+
import {DOMAIN} from '@/utils/constants';
import { useFormStatus } from 'react-dom'
const LoginForm = () => {
    const router = useRouter();
    const {  pending } = useFormStatus();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const handelRegister = () => {
        router.push("/register");
    };

    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault(); // Empêche le rechargement de la page

        // Définition de l'objet utilisateur à envoyer au serveur
        const newUser = {
            email,
            password,

        } as LoginUserDto;

        // Validation de l'objet utilisateur avec le schéma de validation ZOD
        const validated = loginSchema.safeParse(newUser);

        // validation des champs du formulaire
        if (!validated.success) {
            toast.error(validated.error.errors[0].message, {
                autoClose: 5000, // 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        // Si la validation est réussie, vous pouvez effectuer d'autres actions ici
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/users/login`, {email, password});

            toast.success("Connexion réussie!", {
                autoClose: 5000, // 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.replace('/');
            setLoading(false);

            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
            setLoading(false);
        }

    }

    return (
        <div className=" w-100 container d-flex col-md-2 flex-column justify-content-center align-items-center mt-5 mb-5 text-center 3">
            <h1>Se connecter</h1><br/>
            <div className="min-vw-50 w-8/12 p-5 card bg-light show-form shadow-lg">
                <form className="card-body" onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">EMAIL</label>
                        <input
                            type="text"
                            className="form-control border-pink-500 border-3"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Saisir votre adresse email ici"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">MOT DE PASSE</label>
                        <input
                            type="password"
                            className="form-control border-pink-500 border-3"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Saisir votre mot de passe ici"
                        />
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3">
                        <Button disabled={pending} type="submit" className="btn btn-primary w-100 w-md-auto me-0 me-md-2 text-sm-start">
                            SE CONNECTER
                        </Button>
                        <Button disabled={pending} type="button" onClick={handelRegister}
                                className="btn btn-secondary w-100 w-md-auto mt-2 mt-md-0">
                            S&apos;INSCRIRE
                        </Button>
                    </div>

                    <ToastContainer
                        theme="colored"
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        transition={Slide}
                    />
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
