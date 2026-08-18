import Header from "@job-applicants/ui/layout/Header";
import Footer from "@job-applicants/ui/layout/Footer";
import { Outlet } from "react-router";
import { Toaster } from '@job-applicants/ui/components/sonner';


const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
        </>


    )
}

export default Root