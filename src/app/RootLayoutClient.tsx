// src/app/RootLayoutClient.tsx (Client Component)

'use client'; // Ensure this is a client-side component

import React from "react";
import { usePathname } from 'next/navigation';
import ClientSidebar from "@/ui/navigations/ClientSidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayoutClient({
                                             children,
                                         }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    // Check if the current route is under /admin
    const isAdminRoute = pathname.startsWith('/admin');

    return (
        <div className="flex">
            {/* Conditionally render the ClientSidebar only if not on an admin route */}
            {!isAdminRoute && (
                <aside className="w-1/6 bg-gray-50  p-2">
                    <ClientSidebar />
                </aside>
            )}
            <main className={`w-full ${!isAdminRoute ? 'w-4/5' : 'w-full'}`}>
                {children}
                <SpeedInsights />
            </main>
        </div>
    );
}
