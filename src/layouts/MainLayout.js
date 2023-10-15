import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {

    return (
        <>
            <div>
                <Header />
                <div className="flex justify-center">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout