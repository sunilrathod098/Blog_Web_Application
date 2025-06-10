export const API_URL = 'http://localhost:5000/api';

export const PAGINATION_LIMIT = 10;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    BLOGS: '/blogs',
    BLOG_CREATE: '/blog/create',
    BLOG_DETAIL: '/blog/:id',
    BLOG_EDIT: '/blog/edit/:id',
};

export const AUTH_STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
};

export const ERROR_MESSAGES = {
    DEFAULT: 'Something went wrong. Please try again.',
    UNAUTHORIZED: 'You need to be logged in to perform this action.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    NETWORK: 'Network error. Please check your connection.',
};