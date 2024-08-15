"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteProductButtonProps {
    productId: number;
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
    const router = useRouter();

    const deleteArticleHandler = async () => {
        try {
            if (confirm("tu veux supprimer ce produit ?")) {
                await axios.delete(`${DOMAIN}/api/products/${productId}`);
                router.refresh();
                toast.success("produit a été supprimé avec succès");
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <div onClick={deleteArticleHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Supprimer
        </div>
    )
}

export default DeleteProductButton