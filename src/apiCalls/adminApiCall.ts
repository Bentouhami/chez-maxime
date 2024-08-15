// apiCalls/adminApiCall.ts : /api/comments
import { DOMAIN } from "@/utils/constants";
import { CommentWithUser } from "@/utils/types";

// Get all comments
export async function getAllComments(token: string): Promise<CommentWithUser[]> {
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
