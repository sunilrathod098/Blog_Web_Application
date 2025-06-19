import api from './axiosConfig';

export const createBlog = async (blogData) => {
    try {
        const response = await api.post('/blog/create', blogData);
        if (!response) {
            throw new Error("give some error during create a blog")
        }
        return response.data;

    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

export const getAllBlogs = async () => {
    const response = await api.get('/blog/read');
    // Ensure you always return an array
    return Array.isArray(response.data)
        ? response.data
        : response.data?.blogs || [];
};

export const getBlogById = async (id) => {
    try {
        if (id === 'create') {
            throw new Error('Invalid blog id');
        }
        const response = await api.get(`/blog/read/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog with ID ${id}:`, error);
        throw error;
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const response = await api.put(`/blog/update/${id}`, blogData);
        return response.data;
    } catch (error) {
        console.error(`Error updating blog with ID ${id}:`, error);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await api.delete(`/blog/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting blog with ID ${id}:`, error);
        throw error;
    }
};

export const getBlogsByAuthor = async (authorId) => {
    try {
        const response = await api.get(`/blog/author/${authorId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blogs by author ${authorId}:`, error);
        throw error;
    }
};