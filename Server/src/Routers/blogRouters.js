import express from 'express';
import {
    createBlog,
    deleteBlog,
    getBlogById,
    getAllBlogs,
    getBlogsByAuthor,
    updateBlog,
} from '../Controllers/blogController.js';
import { verifyJWT } from '../Middleware/authMiddleware.js';

export const router = express.Router();

router.route('/create').post(verifyJWT, createBlog);
router.route('/read').get(verifyJWT, getAllBlogs);
router.route('/read/:blogId').get(verifyJWT, getBlogById);
router.route('/update/:blogId').put(verifyJWT, updateBlog);
router.route('/delete/:blogId').delete(verifyJWT, deleteBlog);
router.route('/author/:authorId').get(verifyJWT, getBlogsByAuthor);

export default router;