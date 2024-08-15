import {z} from "zod";


// schema pour l'enregistrement d'un nouvel utilisateur (admin et utilisateurs)
export const registerSchema = z.object({
    firstName: z.string().min(3, {message: "Prénom est requis"}).max(20, {message: "Le prénom doit contenir 20 caractères maximum"}),
    lastName: z.string().min(3, {message: "Nom est requis"}).max(20, {message: "Le nom doit contenir 20 caractères maximum"}),
    phoneNumber: z.string()
        .min(10, {message: "Numéro de téléphone est requis"})
        .regex(/^\+(\d{1,3})\s?(\d{2,3})\s?(\d{2,4})\s?(\d{2,4})\s?(\d{2,4})$/, {
            message: "Numéro de téléphone invalide",
        }), // regex pour vérifier le format du numéro de téléphone
    email: z.string().email({message: "L'adresse email est invalide et doit être au format 'email@exemple.com'"}),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au moins 8 caractères"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"}),
    confirmPassword: z.string().min(8, {message: "Veuillez confirmer votre mot de passe"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

// schema pour la connexion d'un utilisateur (admin et utilisateurs)
export const loginSchema = z.object({
    email: z.string().email({message: "L'adresse email est invalide et doit être au format 'email@exemple.com'"}),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au moins 8 caractères"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"}),
});


// schema pour la modification/mise à jour d'un utilisateur
export const updateUserSchema = z.object({
    firstName: z.string()
        .min(1, {message: "First name is required"}).optional(),
    lastName: z.string()
        .min(1, {message: "Last name is required"}).optional(),
    phoneNumber: z.string()
        .min(1, {message: "Phone number is required"}).optional(),
    email: z.string()
        .min(1, {message: "Email is required"}).optional(),
    password: z.string()
        .min(1, {message: "Password is required"}).optional(),

});

// Schéma pour créer un produit
export const createProductSchema = z.object({
    name: z.string().min(2, {message: "Le nom du produit est requis"}).max(255, {message: "Le nom du produit ne doit pas dépasser 255 caractères"}),
    description: z.string().min(2, {message: "La description du produit est requise"}).max(255, {message: "La description du produit ne doit pas dépasser 255 caractères"}),
    price: z.number().min(1, {message: "Le prix du produit est requis"}),
    quantity: z.number().min(1, {message: "La quantité du produit est requise"}),
    image: z.string().url({message: "L'URL de l'image est invalide"}).min(2, {message: "L'URL de l'image est requise"}).max(255, {message: "L'URL de l'image ne doit pas dépasser 255 caractères"}).nullable().optional(), // Optionnel
    categoryId: z.number().positive("La catégorie est requise"),
    bakery_id: z.number().optional().nullable(), // Optionnel
});

// Schéma pour mettre à jour un produit
export const updateProductSchema = z.object({
    name: z.string().min(2, {message: "Le nom du produit est requis"}).max(255, {message: "Le nom du produit ne doit pas dépasser 255 caractères"}).optional(),
    description: z.string().min(2, {message: "La description du produit est requise"}).max(255, {message: "La description du produit ne doit pas dépasser 255 caractères"}).optional(),
    price: z.number().min(1, {message: "Le prix du produit est requis"}).optional(),
    quantity: z.number().min(1, {message: "La quantité du produit est requise"}).optional(),
    image: z.string().url({message: "L'URL de l'image est invalide"}).min(2, {message: "L'URL de l'image est requise"}).max(255, {message: "L'URL de l'image ne doit pas dépasser 255 caractères"}).optional(),
    category: z.string().min(2, {message: "La catégorie du produit est requise"}).max(255, {message: "La catégorie du produit ne doit pas dépasser 255 caractères"}).optional(),
    bakery: z.number().min(1, {message: "L'ID de la boulangerie est requis"}).optional(),
});

// Create Comment Schema
export const createCommentSchema = z.object({
    text: z.string().min(1, "Text is required"),
    productId: z.number(),
});

