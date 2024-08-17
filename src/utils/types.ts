// types.ts file  /utils/types.ts

import {Comment, Product, User} from "@prisma/client";

export type JWTPayload = {
    id: number;
    isAdmin: boolean;
    userEmail: string;
    firstName: string;
    lastName: string;

};

export type CommentWithUser = Comment & {
    user: User
};
export type SingleProduct = Product & { comments: CommentWithUser[] };
