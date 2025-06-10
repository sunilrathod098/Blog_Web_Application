import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <Link to={`/blog/${blog.id}`}>
                <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {blog.title}
                </h2>
            </Link>
            <p className="text-sm test-gray-600 mt-2">
                {blog.content.length > 150
                    ? blog.content.slice(0, 150) + "..."
                    : blog.content}
            </p>
            <div className="text-sm text-gray-500 mt-2">
                {blog.createdAt && (
                    <span>
                        Posted on:{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                )}
                {blog.updatedAt && (
                    <span className="ml-2">
                        Updated on:{" "}
                        {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                )}
                {blog.author?.name && <span className="ml-2">By: {blog.author.name}</span>}
                {blog.author?.email && <span className="ml-2">Email: {blog.author?.email}</span>}
                
            </div>
        </div>
    );
}
