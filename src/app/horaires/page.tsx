import React from 'react';
import styles from './HorairesPage.module.css';
import {Metadata} from "next";
import Link from "next/link";
import {Button} from "react-bootstrap";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('@/components/maps/MapComponent'), {
    ssr: false
});
const HorairesPage = () => {
    return (
        <div className={`${styles.container} mt-5 mb-5 `}>
            <h1 className="description">
                Bienvenue Chez<br/> <span
                className="text-pink-900 text-capitalize">LA BOULANGERIE DE COIN</span><br/>votre
                boulangerie d&apos;avenir
                <br/>
            </h1>
            <h2 className={styles.horairesTitle}>Horaires d’ouverture</h2>
            <ul className={styles.horairesList}>
                <li>
                    <span className={styles.jour}>Lundi :</span> <span className={styles.heure}>Fermé</span>
                </li>
                <li>
                    <span className={styles.jour}>Mardi :</span> <span className={styles.heure}>7:00 - 17:00</span>
                </li>
                <li>
                    <span className={styles.jour}>Mercredi :</span> <span className={styles.heure}>7:00 - 17:00</span>
                </li>
                <li>
                    <span className={styles.jour}>Jeudi :</span> <span className={styles.heure}>7:00 - 17:00</span>
                </li>
                <li>
                    <span className={styles.jour}>Vendredi :</span> <span className={styles.heure}>7:00 - 17:00</span>
                </li>
                <li>
                    <span className={styles.jour}>Samedi :</span> <span className={styles.heure}>7:00 - 16:00</span>
                </li>
                <li>
                    <span className={styles.jour}>Dimanche :</span> <span className={styles.heure}>7:00 - 12:00</span>
                </li>
            </ul>
            <hr/>

            {/*// ajouter une carte google map*/}
            <div className="flex-column flex-md-row align-items-center justify-content-center my-5 text-center order-1 order-md-2">
                <span className="text-black-500 text-capitalize">
                    <b>Visitez notre boutique sur Google Maps</b>
                </span><br/>
                <MapComponent/>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center my-5">
                <div className="text-center order-2 order-md-1">

                    <Link href="/login" passHref>
                        <Button variant="primary" className="mt-3 mb-5 bg-pink-500 border-0">SE CONNECTER</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HorairesPage;
export const metadata: Metadata = {
    title: 'Horaires Page',
    description: 'Articles about programming',
}
