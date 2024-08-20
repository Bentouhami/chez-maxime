// authUtils.ts: src/utils/authUtils.ts utility functions for authentication and authorization in the application

import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken"; // Ensure this path is correct

export function checkIfAdmin(): boolean {
    const token = cookies().get("jwtToken")?.value;
    const payload = token ? verifyTokenForPage(token) : null;
    return payload?.isAdmin || false;
}
