// apiCalls/adminApiCall.ts : /api/comments

import {DOMAIN} from "../../src/utils/constants";
import {Comment} from "@prisma/client";

// Get all comments
export async function getAllComments(token: string): Promise<Comment[]> {
    const response = await fetch(`${DOMAIN}/api/comments`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
}