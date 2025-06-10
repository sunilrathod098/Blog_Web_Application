import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlog } from "../services/api";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getBlog(id).then((res) => setBlog(res.data));
    }, [id]);

    const handleDelete = async () => {
        await deleteBlog(id);
        navigate("/");
    };

    if (!blog) return <p>Loading...</p>;

    const currentUserId = JSON.parse(
        atob(localStorage.getItem("token")?.split(".")[1] || "null")
    )?.user?.id;

    return (
        <div className="p-4">
            <h2 className="text-3xl">{blog.title}</h2>
            <p>{blog.content}</p>
            {currentUserId === blog.author._id && (
                <div className="mt-4 space-x-2">
                    <Link
                        to={`/blogs/edit/${blog._id}`}
                        className="bg-yellow-500 px-3 py-1 text-white"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 px-3 py-1 text-white"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
