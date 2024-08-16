"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Modal from "react-modal";

// Définir l'interface pour les catégories
interface Category {
    id: number;
    name: string;
}

const AddProductForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);

    // Récupérer les catégories depuis l'API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${DOMAIN}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error("Erreur lors de la récupération des catégories");
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    // Récupérer les sous-catégories en fonction de la catégorie sélectionnée
    useEffect(() => {
        if (selectedCategory) {
            const fetchSubCategories = async () => {
                try {
                    const response = await axios.get(`${DOMAIN}/api/subcategories?parentId=${selectedCategory}`);
                    setSubCategories(response.data);
                } catch (error) {
                    toast.error("Erreur lors de la récupération des sous-catégories");
                    console.error(error);
                }
            };

            fetchSubCategories();
        }
    }, [selectedCategory]);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(`${DOMAIN}/api/products`, {
                name: title,
                description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                image: imageUrl,
                categoryId: parseInt(selectedSubCategory),
            });

            setTitle("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setImageUrl(null);
            setSelectedCategory("");
            setSelectedSubCategory("");
            toast.success("Nouveau produit ajouté");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message || "Une erreur s'est produite");
            console.log(error);
        }
    };

    const addCategoryHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const categoryNameInput = (e.currentTarget as HTMLFormElement).elements.namedItem('categoryName');

        if (categoryNameInput) {
            const categoryName = (categoryNameInput as HTMLInputElement).value;

            try {
                const response = await axios.post(`${DOMAIN}/api/categories`, { name: categoryName });
                setCategories([...categories, response.data as Category]);  // Utiliser le type Category ici
                setCategoryModalOpen(false);
                toast.success("Nouvelle catégorie ajoutée");
            } catch (error: any) {
                toast.error(error?.response?.data.message || "Erreur lors de l'ajout de la catégorie");
            }
        }
    };

    const addSubCategoryHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const subCategoryNameInput = (e.currentTarget as HTMLFormElement).elements.namedItem('subCategoryName');

        if (subCategoryNameInput) {
            const subCategoryName = (subCategoryNameInput as HTMLInputElement).value;

            try {
                const response = await axios.post(`${DOMAIN}/api/subcategories/${selectedCategory}`, { name: subCategoryName });

                setSubCategories([...subCategories, response.data as Category]);  // Utiliser le type Category ici
                setSubCategoryModalOpen(false);
                toast.success("Nouvelle sous-catégorie ajoutée");
            } catch (error: any) {
                toast.error(error?.response?.data.message || "Erreur lors de l'ajout de la sous-catégorie");
            }
        }
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="text"
                placeholder="Entrer le titre du produit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="mb-4 p-2 lg:text-xl rounded resize-none"
                rows={5}
                placeholder="Entrer la description du produit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="number"
                placeholder="Entrer le prix du produit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="number"
                placeholder="Entrer la quantité du produit"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            {/* Liste déroulante des catégories */}
            <div className="flex justify-between items-center">
                <select
                    className="mb-4 border rounded p-2 text-xl w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => setCategoryModalOpen(true)}
                    className="ml-2 text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
                >
                    Ajouter Catégorie
                </button>
            </div>

            {/* Liste déroulante des sous-catégories */}
            <div className="flex justify-between items-center">
                <select
                    className="mb-4 border rounded p-2 text-xl w-full"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    disabled={!subCategories.length}
                >
                    <option value="">Sélectionner une sous-catégorie</option>
                    {subCategories.map((subCat) => (
                        <option key={subCat.id} value={subCat.id}>
                            {subCat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => setSubCategoryModalOpen(true)}
                    className="ml-2 text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
                >
                    Ajouter Sous-catégorie
                </button>
            </div>

            <CldUploadWidget
                uploadPreset="ml_default"
                onUpload={(error, result) => {
                    if (error) {
                        toast.error("Une erreur est survenue lors du téléchargement de l'image");
                        return;
                    }
                    setImageUrl(result.info.secure_url);
                    toast.success("Image téléchargée avec succès");
                }}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => open()}  // Utilisation d'une fonction anonyme ici
                        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
                    >
                        Télécharger l&apos;image
                    </button>
                )}
            </CldUploadWidget>


            {imageUrl && (
                <div className="mt-4">
                    <Image src={imageUrl} alt="Image téléchargée" className="w-32 h-32 object-cover rounded" />
                </div>
            )}
            <button type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold mt-4">
                Ajouter
            </button>

            {/* Modale pour ajouter une nouvelle catégorie */}
            <Modal
                isOpen={isCategoryModalOpen}
                onRequestClose={() => setCategoryModalOpen(false)}
                contentLabel="Ajouter Catégorie"
                ariaHideApp={false}
                className="container d-flex mt-40 h-50 w-50 d-flex justify-center items-center bg-white rounded-lg shadow-md "
            >
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold">Ajouter une nouvelle catégorie</h2>
                    <form onSubmit={addCategoryHandler} className="w-full flex flex-col items-center">
                        <input
                            type="text"
                            name="categoryName"
                            className="border rounded p-2 text-xl mb-4 w-full text-center"
                            placeholder="Nom de la catégorie"
                        />
                        <button
                            type="submit"
                            className="text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
                        >
                            Ajouter
                        </button>
                    </form>
                </div>
            </Modal>

            {/* Modale pour ajouter une nouvelle sous-catégorie */}
            <Modal
                isOpen={isSubCategoryModalOpen}
                onRequestClose={() => setSubCategoryModalOpen(false)}
                contentLabel="Ajouter Sous-catégorie"
                ariaHideApp={false}
                className="container d-flex mt-40 h-50 w-50 d-flex justify-center items-center bg-white rounded-lg shadow-md"
            >
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold">Ajouter une nouvelle sous-catégorie</h2>
                    <form onSubmit={addSubCategoryHandler} className="w-full flex flex-col items-center">
                        <input
                            type="text"
                            name="subCategoryName"
                            className="border rounded p-2 text-xl mb-4 w-full text-center"
                            placeholder="Nom de la sous-catégorie"
                        />
                        <button
                            type="submit"
                            className="text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
                        >
                            Ajouter
                        </button>
                    </form>
                </div>
            </Modal>
        </form>
    );
};

export default AddProductForm;