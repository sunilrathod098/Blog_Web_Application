import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/api";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchBlogs(page).then((res) => setBlogs(res.data.blogs));
    }, [page]);

    return (
        <div className="p-4">
            {blogs.map((blog) => (
                <div key={blog._id} className="border-b py-4">
                    <Link to={`/blogs/${blog._id}`} className="text-xl font-bold">
                        {blog.title}
                    </Link>
                    <p>{blog.content.slice(0, 100)}...</p>
                </div>
            ))}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="bg-gray-200 px-3"
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-gray-200 px-3"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
