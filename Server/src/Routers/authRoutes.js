import express from 'express';
import {
    authorInfo,
    loginUser,
    logoutUser,
    registerUser
} from '../Controllers/authController.js';
import { verifyJWT } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT, logoutUser);
router.route("/author").get(verifyJWT, authorInfo);

export default router;