import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth';

interface IAuthContext {
    signed: boolean,
    user: Object | null,
    signIn(): Promise<void>
    signOut(): Promise<void>
    loading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDataFromStorage = async () => {
            const storagedUser = localStorage.getItem('@APPAuth:user');
            const storagedToken = localStorage.getItem('@APPAuth:token');
            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        getDataFromStorage();
    }, []);

    const signIn = async () => {
        const response = await AuthService.login();
        setUser(response.user);

        localStorage.setItem('@APPAuth:user', JSON.stringify(response.user));
        localStorage.setItem('@APPAuth:token', JSON.stringify(response.token));
    }

    const signOut = async () => {
        localStorage.clear();
        setUser(null);
    }

    return (<AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading } as IAuthContext}>
        {children}
    </AuthContext.Provider >)
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}