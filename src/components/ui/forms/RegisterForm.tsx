'use client';

import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {registerSchema} from "@/utils/validationSchemas";
import {Slide, toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DOMAIN} from "@/utils/constants";
import axios from "axios";
import {useRouter} from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const newUser = {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phoneNumber
        };

        const validated = registerSchema.safeParse(newUser);

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
            await axios.post(`${DOMAIN}/api/users/register`, {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                phoneNumber
            });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
            setLoading(false);
        }
        toast.success("Inscription réussie!", {
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="container p-5 mt-5 mb-5 text-center w-100">
            <h1>S&apos;inscrire</h1><br/>
            <div className="container card bg-light show-form w-50 shadow-lg">
                <form className="card-body" onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">PRÉNOM</label>
                        <input
                            type="text"
                            className="form-control form-control border-pink-500 border-3"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Saisir votre prénom ici"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">NOM</label>
                        <input
                            type="text"
                            className="form-control form-control border-pink-500 border-3"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Saisir votre nom ici"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">NUMÉRO DE TÉLÉPHONE</label>
                        <input
                            type="text"
                            className="form-control form-control border-pink-500 border-3"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Numéro de téléphone"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label right-8">ADDRESSE EMAIL</label>
                        <input
                            type="email"
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
                            className="form-control form-control border-pink-500 border-3"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Saisir votre mot de passe ici"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">CONFIRMER MOT DE PASSE</label>
                        <input
                            type="password"
                            className="form-control form-control border-pink-500 border-3"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmer votre mot de passe ici"
                        />
                    </div>
                    <div>
                        <Button type="submit" className="btn btn-primary">S&apos;INSCRIRE</Button>
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

export default RegisterForm;
