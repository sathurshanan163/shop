import asyncHandler from "express-async-handler";
import generate_token from "../utils/generate_token.js"
import User from "../models/user.js"

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.match_password(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
            token: generate_token(password)
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    };
});

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const is_user_exist = await User.findOne({email});
    if (is_user_exist) {
        res.status(400);
        throw new Error("User already exists");
    };
    const {_doc:user} = await User.create({
        name,
        email,
        password
    });
    if (user) {
        res.status(201).json({
           ...user,
           token: generate_token(user._id)
        });        
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    };
});

export {login, register};