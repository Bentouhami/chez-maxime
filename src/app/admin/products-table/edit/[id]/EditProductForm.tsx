"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@prisma/client';
// import { Decimal } from '@prisma/client/runtime';

interface EditProductFormProps {
    product: Product;
}
// Assurez-vous d'importer le type Decimal si ce n'est pas déjà fait

const EditProductForm = ({ product } : EditProductFormProps) => {
    const router = useRouter();
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState<number>(product.price.toNumber());  // Convertir Decimal en number
    const [quantity, setQuantity] = useState(product.quantity);
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [categories, setCategories] = useState<Category[]>([]);

    // Récupérer les catégories lors du montage du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/categories`);
                setCategories(data);
            } catch (error) {
                toast.error("Erreur lors du chargement des catégories");
            }
        };

        fetchCategories();
    }, []);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name === "") return toast.error("Le titre est requis");
        if (description === "") return toast.error("La description est requise");
        if (price === 0) return toast.error("Le prix est requis");
        if (quantity === 0) return toast.error("La quantité est requise");
        if (categoryId === 0) return toast.error("La catégorie est requise");

        try {
            await axios.put(`${DOMAIN}/api/products/${product.id}`, {
                name,
                description,
                price,
                categoryId, // Envoyer l'ID de la catégorie sélectionnée
                quantity
            });
            toast.success("Produit mis à jour avec succès");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message || "Une erreur est survenue");
            console.log(error);
        }
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                className="mb-4 p-2 lg:text-xl rounded resize-none"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
                className="mb-4 border rounded p-2 text-xl"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <select
                className="mb-4 border rounded p-2 text-xl"
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
            >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold">
                Mettre à jour
            </button>
        </form>
    );
}

export default EditProductForm;
