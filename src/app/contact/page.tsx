import dynamic from 'next/dynamic';
import { CiMap, CiPhone } from "react-icons/ci";
import {Metadata} from "next";

// Importer dynamiquement le composant sans SSR
const MapComponent = dynamic(() => import('@/components/maps/MapComponent'), {
    ssr: false
});

const ContactPage = () => {
    return (
        <div className=" vh-100 container d-flex card border-0 justify-content-center align-items-center ">
            <div className="w-100 rounded-1 d-flex justify-content-center align-items-center mb-2 text-white col-md-6 text-center align-items-center" style={{ background: 'rgb(255, 0, 98)' }}>
                <p className="text-uppercase fw-bold">Boulangerie de Coin</p>
                <p className="flex text-center card-text">
                    <CiMap size={30} />
                    Rue des Coins, 7080, Frameries - Belgique
                </p>
                <p className="flex">
                    <CiPhone size={30}  />
                    0445/ 33 37 97
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                <MapComponent />
            </div>
        </div>
    );
};

export default ContactPage;

export const metadata: Metadata = {
    title: 'Contact Page',
    description: 'Articles about programming',
}