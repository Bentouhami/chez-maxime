import {z} from "zod";



/**
 * Update user schema
 * @type {z.ZodType<any, any, any>}
 * @constant updateUserSchema
 * @desc Update user schema
 */
export const updateUserSchema = z.object({
    firstName: z.string()
        .min(1, {message: "First name is required"}),
    lastName: z.string()
        .min(1, {message: "Last name is required"}),
    birthDate: z.string()
        .min(1, {message: "Birth date is required"}),
    gender: z.boolean()
        .optional(),
    phoneNumber: z.string()
        .min(1, {message: "Phone number is required"}),
    email: z.string()
        .min(1, {message: "Email is required"}),
    password: z.string()
        .min(1, {message: "Password is required"}),
    confirmPassword: z.string()
        .min(1, {message: "Confirm password is required"}),

});

/**
 * registerUserSchema
 * @type {z.ZodType<any, any, any>}
 * @constant validateNewUserRegister
 * @desc Register user schema
 *
 */



export const validateNewUserRegister = z.object({
    firstName: z.string().min(3, {message: "Prénom est requis"}).max(20, {message: "Le prénom doit contenir 20 caractères maximum"}),
    lastName: z.string().min(3, {message: "Nom est requis"}).max(20, {message: "Le nom doit contenir 20 caractères maximum"}),
    phoneNumber: z.string()
        .min(10, { message: "Numéro de téléphone est requis" })
        .regex(/^\+(\d{1,3})\s?(\d{2,3})\s?(\d{2,4})\s?(\d{2,4})\s?(\d{2,4})$/, {
            message: "Numéro de téléphone invalide",
        }),


    email: z.string().email({message: "L'adresse email est invalide et doit être au format 'email@exemple.com'"}),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au moins 8 caractères"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"}),
    confirmPassword: z.string().min(8, {message: "Veuillez confirmer votre mot de passe"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

/**
 * Login user schema
 * @type {z.ZodType<any, any, any>}
 * @constant loginUserSchema
 * @desc Login user schema
 */
export const loginUserSchema = z.object({
    email: z.string().email({message: "L'adresse email est invalide et doit être au format 'email@exemple.com'"}),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au moins 8 caractères"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"}),
});
