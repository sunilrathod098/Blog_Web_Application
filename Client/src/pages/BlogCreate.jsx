import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/api';
import { toast } from 'react-toastify';

export default function BlogCreate() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();
    const { title, content } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createBlog(formData);
            if (response.status === 201) {
                toast.success('Blog created successfully');
                navigate('/blogs');
            } else {
                toast.error('Failed to create blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('An error occurred while creating the blog');
        }
        setFormData({
            title: '',
            content: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
            <h2 className='test-2xl mb-4'>Create Blog</h2>
            <input className='block w-full border p-2 mb-2' value={title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <textarea className='block w-full border p-2 mb-2' value={content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
        </form>
    )

}