// admin page (admin dashboard) src/app/admin/page.tsx component
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {verifyTokenForPage} from "@/utils/verifyToken";
import AddProductForm from "@/app/admin/AddProductForm";

const AdminPage = () => {
    const token = cookies().get("jwtToken")?.value;
    if(!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false) redirect("/");

    return (
        <div className="fix-height flex items-center justify-center px-5 lg:px-20">
            <div className="shadow p-4 bg-purple-200 rounded w-full">
                <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
                    Ajouter un produit
                </h2>
                <AddProductForm />
            </div>
        </div>
    )
}

export default AdminPage;