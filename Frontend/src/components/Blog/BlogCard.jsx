import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BlogCard = ({ blog }) => {
    const { user } = useAuth();
    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    <Link to={`/blog/${blog._id}`} className="hover:text-blue-600">
                        {blog.title}
                    </Link>
                </h3>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span className="mr-4">{blog.author.name}</span>
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{formattedDate}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>

                <div className="flex justify-between items-center">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Read more
                    </Link>

                    {user && user._id === blog.author._id && (
                        <div className="flex space-x-2">
                            <Link
                                to={`/blog/edit/${blog._id}`}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Edit
                            </Link>
                            <button
                                className="text-sm text-red-600 hover:text-red-800"
                            // Add delete handler here
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
