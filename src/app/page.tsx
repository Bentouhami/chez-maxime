// home page.tsx component for the home page.tsx of the application
import Link from "next/link";
import {Button} from "react-bootstrap";
import HomePageImage from "@/ui/HomePageImage";

export default function Home() {
    return (
        <div className="container vh-100">
            <HomePageImage />
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center my-5">

                <div className="text-center order-2 order-md-1">
                    <h1 className="description">
                        Bienvenue Chez Maxime, votre boulangerie d&apos;avenir
                        <br/>
                    </h1>
                    <Link href="/login" passHref>
                        <Button variant="primary" className="mt-3 mb-5 bg-pink-500 border-0">SE CONNECTER</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
