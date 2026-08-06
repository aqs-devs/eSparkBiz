import Header from "@job-applicants/ui/layout/Header";
import Footer from "@job-applicants/ui/layout/Footer";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>


    )
}

export default Root