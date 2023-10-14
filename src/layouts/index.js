import React from "react";
import MainLayout from "./MainLayout";

const Layouts = {
    mainLayout: MainLayout
}

const getLayout = () => {
    // if(window.location.pathname === "/"){
    return "mainLayout"
    //}
}

const Container = Layouts[getLayout()]

const Layout = ({ children }) => {
    return <Container>{children}</Container>
}

export default Layout