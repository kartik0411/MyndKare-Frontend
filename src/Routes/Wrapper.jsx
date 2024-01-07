import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import routes from "./routes";
import Layout from "../layouts";

function Wrapper() {
    return (
        <>
            <HashRouter>
                <Routes>
                    {
                        routes.map(({ path, Component }) => (
                            <Route
                                key={path}
                                path={path} 
                                element={
                                    <React.Suspense fallback>
                                        <Layout>
                                            <Component />
                                        </Layout>
                                    </React.Suspense>
                                }
                            />
                        ))
                    }
                </Routes>
            </HashRouter>
        </>
    )
}

export default Wrapper;