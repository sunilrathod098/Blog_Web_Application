import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                // Don't clear tokens automatically - might be temporary server issue
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginUser = (userData, tokens) => {
        setUser(userData);
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
