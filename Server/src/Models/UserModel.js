import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import ApiError from '../Utils/ApiError.js';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    refreshToken: {
        type: String,
        default: null,
        select: false,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified('password'))
        return next();

    //this method is user for encrypt (into a hash code unreadble message type) the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isMatchPassword = async function (password) {
    if (!password || !this.password) {
        throw new ApiError('Invalid password or user not found');
    }
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
}

export const User = mongoose.model('User', userSchema);