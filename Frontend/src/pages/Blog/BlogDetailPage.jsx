import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/UI/Alert";
import Loader from "../../components/UI/Loader";
import { useAuth } from "../../context/AuthContext";
import { deleteBlog, getBlogById } from "../../services/blogService";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (id === "create") {
      navigate("/blog/create");
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        navigate("/blog", { state: { message: "Blog deleted successfully" } });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete blog");
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert type="error" message={error} />;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
        </div>

        <div className="px-6 py-5">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {user && user._id === blog.author._id && (
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
            <Link
              to={`/blog/edit/${blog._id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </article>

      <div className="mt-8">
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailPage;
