import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); // JWT from login

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/api/blogs/${id}`,
                { title, content },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate(`/blogs/${id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Content</label>
                    <textarea
                        className="w-full border border-gray-300 px-3 py-2 rounded h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
}
