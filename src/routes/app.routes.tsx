import React from "react";
import {
    Route,
} from "react-router-dom";

import Home from '../pages/home';

const AppRoutes: React.FC = () => {

    const routes = [
        {
            exact: true,
            path: "/",
            view: <Home />
        }
    ];

    return (
        <>
            {routes.map(({ exact, path, view }) => {
                return <Route key={path} exact={exact} path={path}>{view}</Route>;
            })}
        </>
    )
}

export default AppRoutes;