import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BlogCard from "../../components/Blog/BlogCard";
import Pagination from "../../components/Blog/Pagination";
import Alert from "../../components/UI/Alert";
import Loader from "../../components/UI/Loader";
import { useAuth } from "../../context/AuthContext";
import { useBlogs } from "../../context/BlogContext";

const BlogListPage = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const { blogs, loading, error, fetchAllBlogs } = useBlogs();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    fetchAllBlogs();
  }, [currentPage]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {successMessage && (
        <Alert type="success" message={successMessage} className="mb-6" />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Blog Posts</h1>
        {user && (
          <Link
            to="/blog/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Create Blog
          </Link>
        )}
      </div>

      {error ? (
        <Alert type="error" message={error} />
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600 mb-4">No blogs found</p>
          {user && (
            <Link
              to="/blog/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Create your first blog
            </Link>
          )}
          {!user && (
            <div className="space-y-2">
              <p className="text-gray-500">
                You need to be logged in to create blogs
              </p>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(blogs.length / 10)}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
};

export default BlogListPage;
