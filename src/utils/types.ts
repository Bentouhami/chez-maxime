// types.ts file  /utils/types.ts

import { Product, User, Comment} from "@prisma/client";

export type JWTPayload = {
    id: number;
    isAdmin: boolean;
    userEmail: string;
};

export type CommentWithUser = Comment & {
    user: User
};
export type SingleProduct = Product & { comments: CommentWithUser[] };
