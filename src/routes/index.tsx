import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../context/auth';

const Routes: React.FC = () => {
    const { signed, loading } = useAuth();


    if (loading) {
        return (
            <div>
                loading
            </div>
        );
    }
    else {
        return (
            <Router>
                <Switch>
                    {!signed && <AuthRoutes></AuthRoutes>}
                    {signed && <AppRoutes></AppRoutes>}
                </Switch>
            </Router>
        );
    }


}


export default Routes;