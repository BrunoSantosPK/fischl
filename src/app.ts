import path from "path";
import cors from "cors";
import express from "express";
import routes from "./routes";
import customError from "./validators/error";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(customError);

export default app;