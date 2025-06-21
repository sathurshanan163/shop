import async_handler from "express-async-handler";
import generate_token from "../utils/generate_token.js"
import User from "../models/user.js"

const login = async_handler(async (req, res) => {
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

export {login};