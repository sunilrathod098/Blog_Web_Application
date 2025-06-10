import api from './axiosConfig';

export const createBlog = async (blogData) => {
    const response = await api.post('/blog/create', blogData);
    return response.data;
};

export const getAllBlogs = async () => {
    const response = await api.get('/blog/read');
    return response.data?.blogs || response.data || [];
};

export const getBlogById = async (id) => {
    const response = await api.get(`/blog/read/${id}`);
    return response.data;
};

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blog/update/${id}`, blogData);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await api.delete(`/blog/delete/${id}`);
    return response.data;
};

export const getBlogsByAuthor = async (authorId) => {
    const response = await api.get(`/blog/author/${authorId}`);
    return response.data;
};