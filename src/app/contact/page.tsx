import React from 'react'
import MapComponent from "@/components/maps/MapComponent";
import {CiMap, CiPhone} from "react-icons/ci";

const ContactPage = () => {
    return (
        <div className="container-fluid d-flex card border-0  justify-content-center align-items-center mt-5 w-100">
            {/* Afficher la carte ici */}
            <div className=" m-3 rounded-1 d-felx justify-content-center align-items-center mt-5  mb-2 text-white col-md-6 text-center align-items-center" style={{ background: 'rgb(255, 0, 98)' }}>
                {/*<h1>Contactez-nous</h1>*/}
                <p className=" mb-0 text-uppercase fw-bold">Boulangerie Chez Maxime</p>
                <p className={`flex text-center card-text `}>
                    <CiMap size={20} className={`me-3`}/>
                    Rue de France 23, 7080, Frameries - Belgique</p>

                <p className={`flex`}>
                    <CiPhone size={20} className="me-3"/>
                    0494/ 33 37 97 (Maxime DEMAREZ)</p>
            </div>
            <div className="col-md-6">
                <MapComponent />


            </div>


            {/* Autres informations de contact */}
        </div>
    );
}
export default ContactPage
