import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/UI/Loader";
import { useAuth } from "../../../context/AuthContext";
import { getBlogById } from "../../blogService";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const fetchedBlog = await getBlogById(id);
        setBlog(fetchedBlog);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found</div>;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <UserIcon className="h-4 w-4 mr-1" />
            <span className="mr-4">{blog.author.name}</span>
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="px-6 py-5">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\n/g, "<br>"),
            }}
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
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              // Add delete handler here
            >
              Delete
            </button>
          </div>
        )}
      </article>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailPage;
