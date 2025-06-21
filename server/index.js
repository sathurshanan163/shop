import express from "express";
import user_routes from "./routers/user.js";
import dotenv from "dotenv";
import connect_db from "./config/db.js";

dotenv.config();

connect_db();

const app = express();
app.use(express.json());

app.use("/api/users", user_routes);

app.listen(1000, console.log("Server running on port 1000"));