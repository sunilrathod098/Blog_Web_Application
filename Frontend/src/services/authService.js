import api from "./axiosConfig";
export const register = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);

        if (response.status === 200 && response.data.success) {
            return {
                success: true,
                user: response.data.data.user,
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken,
            };
        }

        throw new Error(response.data?.message || "Registration failed");

    } catch (error) {
        console.error("Registration error:", error);

        let errorMessage = "Registration failed. Please try again.";
        if (error.response) {
            errorMessage = error.response.data?.message ||
                error.response.data?.error ||
                `Server error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post("/auth/login", credentials);
        console.log("Login response:", response); // Add this for debugging
        return response;

    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Login failed",
        };
    }
};

export const logout = async () => {
    try {
        try {
            await api.post("/auth/logout");
        } catch (serverErr) {
            console.log(
                "Server logout failed, falling back to client cleanup",
                serverErr
            );
        }

        // Client-side cleanup
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return { success: true };
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/author");
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Failed to get current user:", error);
        return {
            success: false,
            message: "Failed to fetch user",
        };
    }
};
