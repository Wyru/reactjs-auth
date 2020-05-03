import React from "react";
import {
    Route,
} from "react-router-dom";

import SignIn from '../pages/signIn';

const AuthRoutes: React.FC = () => {

    const routes = [
        {
            exact: true,
            path: "/",
            view: <SignIn></SignIn>
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

export default AuthRoutes;