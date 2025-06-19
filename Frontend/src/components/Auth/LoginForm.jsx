import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/UI/Alert";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import Button from "../UI/Button";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await login(data);
            console.log("Full login response:", response); // Debugging

            // Handle the response structure correctly
            if (response.status !== 200) {
                throw new Error(response.data?.message || "Login failed");
            }

            // Extract tokens and user data from the correct response structure
            const { data: responseData } = response.data;

            if (!responseData?.accessToken || !responseData?.user) {
                throw new Error("Invalid response structure from server");
            }

            // Store tokens and user data
            localStorage.setItem("accessToken", responseData.accessToken);
            localStorage.setItem("refreshToken", responseData.refreshToken);
            loginUser(responseData.user);

            // Redirect to blogs page
            navigate("/blog");
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
            setApiError(errorMessage);

            // Clear any existing tokens on error
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && <Alert type="error" message={apiError} />}

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="name"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div>
                <Button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
