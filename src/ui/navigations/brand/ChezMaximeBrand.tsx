'use client';
import styles from './brand.module.css';
import {MdBakeryDining, MdOutlineBakeryDining} from "react-icons/md";

const ChezMaximeBrand = () => {
    return (
        <div className={styles.logoBrand}>
            <span>Chez</span>
            <MdBakeryDining className={styles.logo} />
            <span>Maxime</span>
        </div>
    );
}
export default ChezMaximeBrand;
