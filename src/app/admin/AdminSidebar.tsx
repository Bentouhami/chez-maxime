// AdminSidebar.tsx : src/app/admin/AdminSidebar.tsx component for the admin sidebar
import React from "react";
import Link from "next/link";
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlineArticle } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className="vh-100 mt-5 p-4 bg-pink-700 text-white">
            <Link href="/admin" className="flex items-center text-lg lg:text-2xl font-semibold mb-6">
                <CgMenuGridR  />
                <span className="hidden lg:block">Dashboard</span>
            </Link>
            <hr className="border-gray-400"/>
            <ul className="mt-6 flex flex-col">
                <Link href="/admin/products-table?pageNumber=1" className="flex items-center text-lg lg:text-xl mb-4 hover:text-yellow-200 transition">
                    <MdOutlineArticle className="me-1" />
                    <span className="hidden lg:block">Produits</span>
                </Link>
                <Link href="/admin/comments-table" className="flex items-center text-lg lg:text-xl mb-4 hover:text-yellow-200 transition">
                    <FaRegComments className="me-1" />
                    <span className="hidden lg:block">Comments</span>
                </Link>
            </ul>
        </div>
    );
};

export default AdminSidebar;
