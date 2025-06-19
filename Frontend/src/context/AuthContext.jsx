import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                if (!token) {
                    setUser(null);
                    return;
                }

                const response = await getCurrentUser();

                // Only set user if the request was truly successful
                if (response.success) {
                    setUser(response.data);
                } else {
                    setUser(null);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setUser(null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const registerUser = (userData) => {
        // register user logic here
        setUser({
            ...userData,
            accessToken: "accessToken",
            refreshToken: "refreshToken",
        });
    };

    const loginUser = (userData) => {
        setUser({
            _id: userData._id,
            name: userData.name,
            email: userData.email,
        });
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, loginUser, logoutUser, registerUser }}
        >
            {!loading && children}
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

export { AuthContext };
