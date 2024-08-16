import Link from "next/link";
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlineArticle } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className="vh-100 mt-5 m-5">
            <Link href="/admin" className="flex items-center text-lg lg:text-2xl font-semibold ">
                <CgMenuGridR className="text-3xl me-1" />
                <span className="hidden lg:block">Dashboard</span>
            </Link>
            <hr/>
            <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
                <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/products-table?pageNumber=1">
                    <MdOutlineArticle className="me-1" />
                    <span className="hidden lg:block">Produits</span>
                </Link>
                <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/comments-table">
                    <FaRegComments className="me-1" />
                    <span className="hidden lg:block">Comments</span>
                </Link>
            </ul>
        </div>
    )
}

export default AdminSidebar;