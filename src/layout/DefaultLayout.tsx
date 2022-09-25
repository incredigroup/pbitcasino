import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
    return (
        <>
        {/* Header Component always will be imported */}
            <Header />
        {/* Component what you want will be imported according to path */}
            <Outlet />
        {/* Footer Component always will be imported */}
            <Footer />
        </>
    )
};