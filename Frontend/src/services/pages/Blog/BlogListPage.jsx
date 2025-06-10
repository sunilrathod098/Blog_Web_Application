import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../../../components/Blog/BlogCard";
import Pagination from "../../../components/Blog/Pagination";
import Loader from "../../../components/UI/Loader";
import { getAllBlogs } from "../../blogService";

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const {
          blogs: fetchedBlogs,
          currentPage,
          totalPages,
        } = await getAllBlogs(page);
        setBlogs(fetchedBlogs);
        setPagination({ currentPage, totalPages });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Blog Posts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
};

export default BlogListPage;
