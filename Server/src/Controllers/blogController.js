import { User } from '../Models/UserModel.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import asyncHandler from '../Utils/asyncHandler.js';
import { Blog } from '../Models/blogModel.js';

export const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    if (![title, content, author].every(Boolean)) {
        throw new ApiError(400, 'All fields (title, content, author) are required');
    }

    const newBlog = await Blog.create({
        title,
        content,
        author
    })
    if (!newBlog) {
        throw new ApiError(500, 'Failed to create blog');
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            'Blog created successfully',
            newBlog
        )
    );
});


export const getAllBlogs = asyncHandler(async (req, res) => {
    const pages = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (pages - 1) * limit;

    const blogs = await Blog.find().skip(skip).limit(limit).sort({
        createdAt: -1
    });
    const total = await Blog.countDocuments();
    const totalPages = Math.ceil(total / limit);

    if (!blogs || blogs.length === 0) {
        throw new ApiError(404, 'No blogs are found');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'Blogs fetched successfully',
            blogs,
            {
                currentPage: pages,
                totalPages: totalPages,
                totalBlogs: total
            }
        )
    );
});


export const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        throw new ApiError(400, 'Blog ID is required');
    }

    const blog = await Blog.findById(blogId).populate('author', 'username email');
    if (!blog) {
        throw new ApiError(404, 'Blog not found');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'Blog fetched successfully',
            blog
        )
    );
});


export const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, content } = req.body;

    if (!blogId) {
        throw new ApiError(400, 'Blog ID is required');
    }

    if (![title, content].every(Boolean)) {
        throw new ApiError(400, 'Title and content are required');
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        title,
        content
    }, { new: true });

    if (!updatedBlog) {
        throw new ApiError(404, 'Blog not found or update failed');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'Blog updated successfully',
            updatedBlog
        )
    );
});


export const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        throw new ApiError(400, 'Blog ID is required');
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
        throw new ApiError(404, 'Blog not found or delete failed');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'Blog deleted successfully',
            deletedBlog
        )
    );
});

export const getBlogsByAuthor = asyncHandler(async (req, res) => {
    const { authorId } = req.params;
    if (!authorId) {
        throw new ApiError(400, 'Author ID is required');
    }

    const blogs = await Blog.find({ author: authorId });
    if (!blogs || blogs.length === 0) {
        throw new ApiError(404, 'No blogs found for this author');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'Blogs by author fetched successfully',
            blogs
        )
    );
});