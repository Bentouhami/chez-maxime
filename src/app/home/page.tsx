// home page.tsx component for the home page.tsx of the application
import Styles from "./Home.module.css";
import Link from "next/link";
import {Button} from "react-bootstrap";
import HomePageImage from "@/components/ui/HomePageImage";

const HomePage = () => {
    return (
        <div className="container">
            <HomePageImage />
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center my-5">

                <div className="text-center order-2 order-md-1">
                    <h1 className={Styles.description}>
                        Bienvenue Chez Maxime, votre boulangerie d'excellence. Voici les produits que nous proposons.
                        <br/>
                    </h1>
                    <Link href="/login" passHref>
                        <Button variant="primary" className="mt-3 mb-5 bg-pink-500 border-0">Login</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
