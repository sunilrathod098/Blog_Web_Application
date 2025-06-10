import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const { user, accessToken, refreshToken } = await login(data);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            loginUser(user);
            navigate("/blogs");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <Alert type="error" message={error} />}

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
                    {...register("email", { required: "Email is required" })}
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
                    {...register("password", { required: "Password is required" })}
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
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
