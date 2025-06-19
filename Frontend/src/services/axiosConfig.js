import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        if (response.data && typeof response.data === 'object') {
            if (response.data.success === undefined) {
                response.data.success = true;
            }
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Case 1: Initial token expired - try refresh
            if (!originalRequest._retry && localStorage.getItem('refreshToken')) {
                originalRequest._retry = true;

                try {
                    const refreshResponse = await axios.post(
                        `${API_URL}/auth/refresh-token`,
                        { refreshToken: localStorage.getItem('refreshToken') },
                        { withCredentials: true }
                    );

                    if (refreshResponse.data?.data?.tokens?.accessToken) {
                        const { accessToken } = refreshResponse.data.data.tokens;
                        localStorage.setItem('accessToken', accessToken);
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    // Fall through to clear tokens and redirect
                }
            }

            // Case 2: Refresh failed or no refresh token - clear and redirect
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // Handle other errors
        if (error.response?.data) {
            // Normalize error response structure
            if (error.response.data.success === undefined) {
                error.response.data.success = false;
            }
            if (!error.response.data.message && error.response.data.statusCode) {
                error.response.data.message = error.response.data.statusCode;
            }
        }

        return Promise.reject(error);
    }
);

export default api;