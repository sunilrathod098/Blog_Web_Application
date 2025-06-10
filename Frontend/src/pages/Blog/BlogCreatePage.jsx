import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/Blog/BlogForm";
import Alert from "../../components/UI/Alert";
import { createBlog } from "../../services/blogService";

const BlogCreatePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createBlog(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Blog Post
      </h1>

      {error && <Alert type="error" message={error} />}

      <BlogForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};

export default BlogCreatePage;
