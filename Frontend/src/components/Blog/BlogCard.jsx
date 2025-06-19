import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BlogCard = ({ blog, onDelete }) => {
    const { user } = useAuth();

    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const contentPreview =
        blog.content.length > 150
            ? `${blog.content.substring(0, 150)}...`
            : blog.content;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg h-full flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="hover:text-blue-600 transition-colors"
                    >
                        {blog.title}
                    </Link>
                </h3>

                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                    <span className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {blog.author?.name || "Anonymous"}
                    </span>
                    <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formattedDate}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{contentPreview}</p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Read more →
                    </Link>

                    {user?._id === blog.author?._id && (
                        <div className="flex space-x-4">
                            <Link
                                to={`/blog/edit/${blog._id}`}
                                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => onDelete(blog._id)}
                                className="text-sm text-red-600 hover:text-red-800 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
