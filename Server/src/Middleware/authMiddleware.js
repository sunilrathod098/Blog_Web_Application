import jwt from 'jsonwebtoken';
import ApiError from '../Utils/ApiError.js';
import { User } from '../Models/UserModel.js';
import asyncHandler from '../Utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const bearerToken = req.header('Authorization');
        const token = req.cookies?.accessToken || (bearerToken && bearerToken.replace(/^Bearer\s*/, ''));

        if (!token) {
            throw new ApiError(401, 'Unauthorized access');
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id || decodedToken.id; //fallback for diff token structures
        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, 'Invalid access token');
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT verification failed:", error.message);
        throw new ApiError(401, error.message || 'Invalid access token');
    }
})
