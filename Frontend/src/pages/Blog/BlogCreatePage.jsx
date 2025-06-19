import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/Blog/BlogForm";
import Alert from "../../components/UI/Alert";
import { useAuth } from "../../context/AuthContext";
import { useBlogs } from "../../context/BlogContext"; // Import useBlogs

const BlogCreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createNewBlog } = useBlogs(); // Use context
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (blogData) => {
    try {
      setLoading(true);
      setError(null);
      await createNewBlog({
        ...blogData,
        author: user._id,
      });
      navigate("/blog", {
        state: { message: "Blog post created successfully" },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Blog Post
      </h1>

      {error && <Alert type="error" message={error} className="mb-4" />}

      <BlogForm
        onSubmit={handleSubmit}
        loading={loading}
        initialData={{ title: "", content: "" }}
      />
    </div>
  );
};

export default BlogCreatePage;
