import React from 'react';
import styles from './HorairesPage.module.css';

const HorairesPage = () => {
    return (
        <div className={`${styles.container} mt-5 mb-5 `}>
            <h1 className={styles.horairesTitle}>Horaires d’ouverture</h1>
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
        </div>
    );
}

export default HorairesPage;
