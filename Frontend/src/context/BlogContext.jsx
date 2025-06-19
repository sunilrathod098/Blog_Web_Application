import { createContext, useContext, useState } from "react";
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
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewBlog = async (blogData) => {
        try {
            setLoading(true);
            setError(null);
            const blog = await createBlog(blogData);
            setBlogs((prev) => [blog, ...prev]);
            return blog;
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to create blog"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const blogsData = await getAllBlogs();
            setBlogs(blogsData);
            return blogsData;
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to fetch blogs"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const blog = await getBlogById(id);
            setCurrentBlog(blog);
            return blog;
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                `Failed to fetch blog with ID ${id}`
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateExistingBlog = async (id, blogData) => {
        try {
            setLoading(true);
            setError(null);
            const updatedBlog = await updateBlog(id, blogData);
            setBlogs((prev) =>
                prev.map((blog) => (blog._id === id ? updatedBlog : blog))
            );
            if (currentBlog?._id === id) {
                setCurrentBlog(updatedBlog);
            }
            return updatedBlog;
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                `Failed to update blog with ID ${id}`
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteExistingBlog = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteBlog(id);
            setBlogs((prev) => prev.filter((blog) => blog._id !== id));
            if (currentBlog?._id === id) {
                setCurrentBlog(null);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                `Failed to delete blog with ID ${id}`
            );
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
                blogs,
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

export const useBlogs = () => useContext(BlogContext);
