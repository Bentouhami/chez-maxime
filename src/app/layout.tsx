// src/app/layout.tsx (Server Component)

import type {Metadata} from "next";
import React from "react";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';
import {Inter} from 'next/font/google';


import Header from "@/ui/navigations/header/header";
import Footer from "@/ui/navigations/footer/Footer";
import RootLayoutClient from "./RootLayoutClient"; // Import the client component

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Boulangerie Chez Maxime",
    description: "Votre Boulangerie chez Maxime",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className} data-theme="dark">
        <Header/>
        <RootLayoutClient>{children}</RootLayoutClient>
        <Footer/>
        </body>
        </html>
    );
}
