import express from "express";
import {login, register, profile} from "../controllers/user.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/:id").get(auth, profile);

export default router;