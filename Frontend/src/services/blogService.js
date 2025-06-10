import api from './axiosConfig';

export const createBlog = async (blogData) => {
    const response = await api.post('/blog', blogData);
    return response.data;
};

export const getAllBlogs = async (page = 1, limit = 10) => {
    const response = await api.get(`/blog?page=${page}&limit=${limit}`);
    return response.data;
};

export const getBlogById = async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
};

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blog/${id}`, blogData);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
};