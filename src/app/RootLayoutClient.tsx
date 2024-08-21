// src/app/RootLayoutClient.tsx (Client Component) global layout for the client

'use client'; // Ensure this is a client-side component

import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import ClientSidebar from "@/ui/navigations/ClientSidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayoutClient({
                                             children,
                                         }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Check if the current route is under /admin
    const isAdminRoute = pathname.startsWith('/admin');

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSubCategorySelect = () => {
        setDropdownOpen(false); // Close the dropdown when a subcategory is selected
    };

    return (
        <div className="flex flex-col md:flex-row">
            {!isAdminRoute && (
                <div className="md:hidden w-full ">
                    {/* Dropdown for mobile */}
                    <button
                        onClick={handleDropdownToggle}
                        className="w-full bg-pink-600 text-white px-4 py-2 text-left"
                    >
                        {isDropdownOpen ? "Hide Categories" : "Show Categories"}
                    </button>
                    {isDropdownOpen && (
                        <div className="w-full bg-gray-50 px-3 py-0 drop-shadow-md absolute z-50">
                            <ClientSidebar onSelect={handleSubCategorySelect} />
                        </div>
                    )}
                </div>
            )}

            {!isAdminRoute && (
                <aside className="hidden md:block w-1/4 bg-gray-50 px-3 py-0 drop-shadow-md">
                    <ClientSidebar onSelect={handleSubCategorySelect} />
                </aside>
            )}
            <main className={`w-full ${!isAdminRoute && 'md:w-3/4'}`}>
                {children}
                <SpeedInsights />
            </main>
        </div>
    );
}
