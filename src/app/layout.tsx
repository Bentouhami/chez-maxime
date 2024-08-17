import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import 'leaflet/dist/leaflet.css'
import Header from "@/ui/navigations/header/header";
import Footer from "@/ui/navigations/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Boulangerie Chez Maxime",
    description: "Votre Boulangerie chez Maxime",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className} data-theme="dark">
        <Header />
        <main>
            {children}
            <SpeedInsights />
        </main>
        <Footer />
        </body>
        </html>
    );
}
