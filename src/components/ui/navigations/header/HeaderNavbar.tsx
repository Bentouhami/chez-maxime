"use client";
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from "react-bootstrap";
import Link from "next/link";
import styles from './Header.module.css';
import ChezMaximeBrand from "@/components/ui/navigations/brand/ChezMaximeBrand";
import { BsBasket, BsChatText } from "react-icons/bs";
import { TbInfoSquareRounded } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import LogoutButton from './LogoutButton';

interface NavbarProps {
    isLoggedIn: boolean; // Ajout de la prop pour vérifier si l'utilisateur est connecté
    userEmail: string | null; // Ajout de la prop pour l'email de l'utilisateur
    isAdmin: boolean;
}

const HeaderNavbar = ({isAdmin, isLoggedIn, userEmail }: NavbarProps) => {
    const [toggle, setToggle] = useState(false);

    const handleSelect = () => {
        setToggle(false);
    };

    return (
        <Navbar className="sticky-top" expand="lg" bg="light" data-bs-theme="light" expanded={toggle}>
            <Container>
                <Link href={"/"} passHref>
                    <Navbar.Brand><ChezMaximeBrand /></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setToggle(!toggle)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`mx-auto justify-content-center flex-lg-row flex-column ${styles.navLinks}`}
                         onSelect={handleSelect}>
                        <Link href="/" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <CiHome size={20} className={`me-1 ${styles.logo}`} />
                            Accueil
                        </Link>

                        <Link href="/products" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <BsBasket size={20} className={`me-1 ${styles.logo}`} />
                            Produits
                        </Link>

                        <Link href="/infos" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <TbInfoSquareRounded size={20} className={`me-1 ${styles.logo}`} />
                            Infos
                        </Link>
                        <Link href="/horaires" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <MdAccessTime size={20} className={`me-1 ${styles.logo}`} />
                            Horaires
                        </Link>
                        <Link href="/about" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <AiOutlineQuestionCircle size={20} className={`me-1 ${styles.logo}`} />
                            A propos
                        </Link>
                        <Link href="/contact" className={`d-flex me-lg-2 my-1 my-lg-0 ${styles.navLink}`}
                              onClick={handleSelect}>
                            <BsChatText size={20} className={`me-1 ${styles.logo}`} />
                            Contact
                        </Link>
                    </Nav>
                    <div className="d-flex flex-column flex-lg-row justify-content-end">
                        {isLoggedIn ? (
                            <>
                                <strong className="me-3 text-primary">{userEmail}</strong>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link className="me-3 btn btn-outline-primary" href="/login" passHref>
                                    SE CONNECTER
                                </Link>
                                <Link className="btn btn-outline-primary" href="/register" passHref>
                                    S&apos;INSCRIRE
                                </Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderNavbar;
