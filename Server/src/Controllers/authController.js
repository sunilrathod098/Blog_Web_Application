import { User } from '../Models/UserModel.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import asyncHandler from '../Utils/asyncHandler.js';

export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating tokens', error);
    }
}


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (![name, email, password].every(Boolean)) {
        throw new ApiError(401, 'All fields are required');
    }

    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, 'User already exists with this name or email');
    }

    const user = await User.create({
        name,
        email,
        password
    })
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
        throw new ApiError(500, 'User creation failed');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'User registered successfully',
            createdUser
        )
    )
});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log("Request body:", req.body);

    if (![email, password].every(Boolean)) {
        throw new ApiError(400, 'All fields are required')
    }

    const user = await User.findOne({ email }).select('+password +refreshToken');
    if (!user) {
        throw new ApiError(404, 'User not found with this email');
    }

    const isPasswordValid = await user.isMatchPassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid user Credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
    if (!loggedInUser) {
        throw new ApiError(500, 'User login failed');
    }

    return res.status(200)
        .cookie('accessToken', accessToken)
        .cookie('refreshToken', refreshToken)
        .json(
            new ApiResponse(
                200,
                'User logged in successfully',
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }
            )
        )
});


export const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, 'User ID is required to logout');
    }

    const user = await User.findById(userId).select('+refreshToken');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    return res.status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json(
            new ApiResponse(
                200,
                'User logged out successfully'
            )
        );
});

export const authorInfo = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(400, 'User ID is required to get author info');
    }
    const user = await User.findById(userId).select('+profile');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                'Author info retrieved successfully',
                user
            )
        );
});