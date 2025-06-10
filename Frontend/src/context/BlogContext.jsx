import { createContext, useState } from "react";
import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
} from "../services/blogService";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [currentBlog, setCurrentBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewBlog = async (blogData) => {
        try {
            setLoading(true);
            const blog = await createBlog(blogData);
            return blog;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create blog");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllBlogs = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            const { blogs, currentPage, totalPages } = await getAllBlogs(page, limit);
            return { blogs, currentPage, totalPages };
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch blogs");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogById = async (id) => {
        try {
            setLoading(true);
            const blog = await getBlogById(id);
            setCurrentBlog(blog);
            return blog;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch blog");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateExistingBlog = async (id, blogData) => {
        try {
            setLoading(true);
            const updatedBlog = await updateBlog(id, blogData);
            setCurrentBlog(updatedBlog);
            return updatedBlog;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update blog");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteExistingBlog = async (id) => {
        try {
            setLoading(true);
            await deleteBlog(id);
            setCurrentBlog(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete blog");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearCurrentBlog = () => {
        setCurrentBlog(null);
    };

    return (
        <BlogContext.Provider
            value={{
                currentBlog,
                loading,
                error,
                createNewBlog,
                fetchAllBlogs,
                fetchBlogById,
                updateExistingBlog,
                deleteExistingBlog,
                clearCurrentBlog,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

// Remove useBlog export from this file for Fast Refresh compatibility.
