import express from "express";
const routes = express.Router();

import FormController from "./controllers/form";

routes.get("/form", FormController.get);
routes.post("/form");

export default routes;