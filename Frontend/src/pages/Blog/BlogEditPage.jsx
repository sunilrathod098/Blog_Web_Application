import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../components/Blog/BlogForm";
import Alert from "../../components/UI/Alert";
import Loader from "../../components/UI/Loader";
import { useAuth } from "../../context/AuthContext";
import { getBlogById, updateBlog } from "../../services/blogService";

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlogById(id);

        // Check if current user is the author
        if (!loading && user._id !== fetchedBlog.author._id) {
          navigate("/blog");
          return;
        }

        setBlog(fetchedBlog);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blog, user, loading, id, navigate]);

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    setError(null);
    try {
      await updateBlog(id, data);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog Post</h1>

      {error && <Alert type="error" message={error} />}

      <BlogForm
        onSubmit={onSubmit}
        initialData={blog}
        loading={submitLoading}
      />
    </div>
  );
};

export default BlogEditPage;
