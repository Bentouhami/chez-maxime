// /api/v1/users/login : route pour la connexion d'un utilisateur

import {NextRequest, NextResponse} from 'next/server';
import {errorHandler} from "@/utils/handelErrors";
import bcrypt from "bcryptjs";
import {LoginUserDto} from "@/utils/dtos";
import {setCookie} from "@/utils/generateToken";
import {JWTPayload} from "@/utils/types";
import {loginSchema} from "@/utils/validationSchemas";
import prisma from "@/utils/db";
import {User} from "@prisma/client";

/**
 * @method POST
 * @route.ts /api/v1/users/login
 * @desc Login a user
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        // Obtenez le corps de la requête
        const body = (await request.json()) as LoginUserDto;

        const validated = loginSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json(
                {error: validated.error.errors[0].message},
                {status: 400});
        }

        // Obtenez l'utilisateur à partir de la base de données avec l'email donné
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        }) as User;

        // Si l'utilisateur n'est pas trouvé, retournez un message d'erreur
        if (!user) {
            return errorHandler("Invalid credentials, please try again or register", 400);
        }

        // Vérifiez si le mot de passe correspond
        const isMatched =
            await bcrypt.compare(body.password, user.password);
        if (!isMatched) {
            return errorHandler(
                "Invalid credentials, please try again or register", 400);
        }

        // Générez un jeton et retournez l'objet de réponse utilisateur
        const jwtPayload: JWTPayload = {
            id: user.id,
            isAdmin: user.isAdmin,
            userEmail: user.email
        };
        // Générez un cookie et retournez l'objet de réponse utilisateur
        const cookie = setCookie(jwtPayload);
        return NextResponse.json(
            {message: "Authenticated"},
            {
                status: 200,
                headers: {
                    'Set-Cookie': cookie
                }
            }
        );
    } catch (error) {
        return errorHandler("Internal server error", 500);
    }
}
