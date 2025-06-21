import jwt from "jsonwebtoken";

const generate_token = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1hr"
    });
};

export default generate_token;