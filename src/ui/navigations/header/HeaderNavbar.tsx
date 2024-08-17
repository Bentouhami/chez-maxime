"use client";
import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import ChezMaximeBrand from "@/ui/navigations/brand/ChezMaximeBrand";
import { BsBasket, BsChatText } from "react-icons/bs";
import { TbInfoSquareRounded } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import LogoutButton from './LogoutButton';

interface NavbarProps {
    isLoggedIn: boolean;
    userEmail: string | null;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
}

const HeaderNavbar: React.FC<NavbarProps> = ({ isAdmin, isLoggedIn, userEmail, firstName, lastName }) => {
    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();

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
                    <div className="d-flex flex-column flex-lg-row justify-content-end align-items-center">
                        {isLoggedIn ? (
                            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                                <strong>
                                    {`Bienvenue: ${firstName} ${lastName}`}
                                    {isAdmin ? ' (admin)' : ' (utilisateur)'}
                                </strong>
                                <strong>{userEmail}</strong>

                                {isAdmin && pathname !== '/admin' && (
                                    <Link href="/admin" passHref legacyBehavior>
                                        <Button variant="primary" className="mt-3 mb-3 bg-pink-500 border-0">Dashboard</Button>
                                    </Link>
                                )}

                                <LogoutButton />
                            </div>
                        ) : (
                            <>
                                <Link href="/login" passHref legacyBehavior>
                                    <Button variant="outline-primary" className="btn-custom me-lg-2 mb-2 mb-lg-0">
                                        SE CONNECTER
                                    </Button>
                                </Link>
                                <Link href="/register" passHref legacyBehavior>
                                    <Button variant="outline-primary" className="btn-custom">
                                        S&apos;INSCRIRE
                                    </Button>
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
