import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import HeaderNavbar from "@/components/ui/navigations/header/HeaderNavbar";

const Header = () => {
    const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);

    const isLoggedIn = !!payload;
    const userEmail = payload?.userEmail || "";

    return (
        <header >
            <HeaderNavbar isAdmin={payload?.isAdmin || false} isLoggedIn={isLoggedIn} userEmail={userEmail} />
        </header>
    );
}

export default Header;
