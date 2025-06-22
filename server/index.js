import express from "express";
import user_routes from "./routers/user.js";
import dotenv from "dotenv";
import connect_db from "./config/db.js";
import {error_handler} from "./middleware/error.js";

dotenv.config();

connect_db();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API");
})
app.use("/api/users", user_routes);

app.use(error_handler);

app.listen(4000, console.log("Server running on port 4000"));