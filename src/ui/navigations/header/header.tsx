import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import HeaderNavbar from "@/ui/navigations/header/HeaderNavbar";

const Header = () => {
    const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);

    const isLoggedIn = !!payload;
    const userEmail = payload?.userEmail || "";
    const firstName = payload?.firstName || "";
    const lastName = payload?.lastName || "";

    return (
        <header >

            <HeaderNavbar isAdmin={payload?.isAdmin || false} isLoggedIn={isLoggedIn} userEmail={userEmail} firstName={firstName} lastName={lastName} />
        </header>
    );
}

export default Header;
