// Header.tsx : Composant React pour le header de la page

'use client';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";
import Link from "next/link";
import styles from './Header.module.css';
import ChezMaximeBrand from "@/components/ui/navigations/brand/ChezMaximeBrand";
import {BsBasket, BsChatText} from "react-icons/bs";
import {TbInfoSquareRounded} from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {CiHome} from "react-icons/ci";


const Header = () => {
    const [expanded, setExpanded] = useState(false);

    const handleSelect = () => {
        setExpanded(false);
    };

    return (
        <Navbar className="sticky-top" expand="lg" bg="light" data-bs-theme="light" expanded={expanded}>
            <Container>
                <Link href={"/"} passHref>
                    <Navbar.Brand><ChezMaximeBrand /></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`mx-auto justify-content-center flex-lg-row flex-column ${styles.navLinks}`}
                         onSelect={handleSelect}>
                        <Link href="/" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <CiHome size={20} className={`me-1 ${styles.logo}`}/>
                            Accueil
                        </Link>

                        <Link href="/produits" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <BsBasket size={20} className={`me-1 ${styles.logo}`}/>
                            Produits
                        </Link>

                        <Link href="/infos" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <TbInfoSquareRounded size={20} className={`me-1 ${styles.logo}`}/>
                            Infos
                        </Link>
                        <Link href="/horaires" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <MdAccessTime size={20} className={`me-1 ${styles.logo}`}/>
                            Horaires
                        </Link>
                        <Link href="/about" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <AiOutlineQuestionCircle size={20} className={`me-1 ${styles.logo}`}/>
                            A propos
                        </Link>
                        <Link href="/contact" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <BsChatText size={20} className={`me-1 ${styles.logo}`}/>
                            Contact
                        </Link>
                    </Nav>
                    <div className="d-flex flex-column flex-lg-row justify-content-end">
                        <Link href="/login" passHref>
                            <Button variant="outline-primary" className="me-lg-2 mb-2 mb-lg-0"
                                    onClick={handleSelect}>SE CONNECTER</Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button variant="outline-primary" onClick={handleSelect}>S&apos;INSCRIRE
                            </Button>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
        ;
}

export default Header;
