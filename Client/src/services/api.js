import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Auth apis
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = () => API.post('/auth/logout');

//blogs apis
export const fetchBlogs = (page) => API.get(`/blog?page=${page}`);
export const getBlog = (id) => API.get(`/blog/${id}`);
export const createBlog = (data) => API.post('/blog', data);
export const updateBlog = (id, data) => API.put(`/blog/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);
