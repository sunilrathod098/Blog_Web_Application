import { useEffect, useState } from "react";
import BlogCard from "../../components/Blog/BlogCard";
import Alert from "../../components/UI/Alert";
import Loader from "../../components/UI/Loader";
import { getAllBlogs } from "../../services/blogService";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllBlogs();

        // Handle different response structures
        const blogsData = Array.isArray(response)
          ? response
          : response?.blogs || [];

        setBlogs(blogsData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blogs");
        setBlogs([]); // Ensure we always have an array
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Blog Posts</h1>

      {error ? (
        <Alert type="error" message={error} />
      ) : blogs.length === 0 ? (
        <div className="text-center py-8">No blogs found</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
