import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log(userData);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};