import path from "path";
import cors from "cors";
import express from "express";
import routes from "./routes";
import customError from "./validators/error";

const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(customError);

export default app;