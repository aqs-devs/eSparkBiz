import Header from "@job-applicants/ui/layout/Header";
import Footer from "@job-applicants/ui/layout/Footer";
import { Outlet, useLocation } from "react-router";
import { Toaster } from '@job-applicants/ui/components/sonner';


const Root = () => {
    const { pathname } = useLocation();
    const usesAppShell =
        pathname.startsWith('/applicants') || pathname.startsWith('/users');

    return (
        <>
            {!usesAppShell && <Header />}
            <Outlet />
            <Footer />
            <Toaster />
        </>


    )
}

export default Root
