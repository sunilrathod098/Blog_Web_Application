import express from 'express';
import {
    loginUser,
    logoutUser,
    registerUser
} from '../Controllers/authController.js';
import { verifyJWT } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT, logoutUser);

export default router;